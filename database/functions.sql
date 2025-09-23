CREATE OR REPLACE FUNCTION inserer_saisie_operation_robuste(
    p_mois INT,
    p_annee INT,
    p_npiece VARCHAR(15),
    p_lignes_text TEXT
) RETURNS VARCHAR AS $$
DECLARE
    v_idso VARCHAR(50);
    v_clean_text TEXT;
    v_json_text TEXT;
    v_json_valid JSON;
    v_matches TEXT[];
    v_match TEXT;
    v_libelle TEXT;
    v_compte TEXT;
    v_ref TEXT;
    v_montant DOUBLE PRECISION;
    v_operation INT;
    v_idpc VARCHAR(50);
BEGIN
    -- Nettoyer le texte des caractères problématiques
    v_clean_text := REGEXP_REPLACE(p_lignes_text, '[^\u0020-\u007E\u00A0-\u00FF{}\[\],:]', '', 'g');
    
    -- Insertion dans SaisieOperation
    INSERT INTO SaisieOperation(mois, annee, npiece)
    VALUES (p_mois, p_annee, p_npiece)
    RETURNING idso INTO v_idso;
    
    -- Extraire chaque objet entre {}
    v_matches := REGEXP_MATCHES(v_clean_text, '{([^}]*)}', 'g');
    
    -- Parcourir chaque match (chaque ligne)
    FOREACH v_match IN ARRAY v_matches
    LOOP
        -- Extraire les valeurs avec des expressions régulières robustes
        v_libelle := COALESCE(
            (SELECT (REGEXP_MATCHES(v_match, 'libelle[:\s]*([^,}]*)'))[1]),
            (SELECT (REGEXP_MATCHES(v_match, '"libelle"[:\s]*"([^"]*)"'))[1])
        );
        
        v_compte := COALESCE(
            (SELECT (REGEXP_MATCHES(v_match, 'compte[:\s]*([^,}]*)'))[1]),
            (SELECT (REGEXP_MATCHES(v_match, '"compte"[:\s]*"([^"]*)"'))[1])
        );
        
        v_ref := COALESCE(
            (SELECT (REGEXP_MATCHES(v_match, 'ref[:\s]*([^,}]*)'))[1]),
            (SELECT (REGEXP_MATCHES(v_match, '"ref"[:\s]*"([^"]*)"'))[1])
        );
        
        v_montant := COALESCE(
            (SELECT (REGEXP_MATCHES(v_match, 'montant[:\s]*([0-9]+)'))[1]::DOUBLE PRECISION),
            (SELECT (REGEXP_MATCHES(v_match, '"montant"[:\s]*([0-9]+)'))[1]::DOUBLE PRECISION),
            0
        );
        
        v_operation := COALESCE(
            (SELECT (REGEXP_MATCHES(v_match, 'operation[:\s]*([0-9]+)'))[1]::INT),
            (SELECT (REGEXP_MATCHES(v_match, '"operation"[:\s]*([0-9]+)'))[1]::INT),
            0
        );
        
        -- Nettoyer les valeurs des espaces et guillemets
        v_libelle := TRIM(REGEXP_REPLACE(v_libelle, '^["\s]+|["\s]+$', '', 'g'));
        v_compte := TRIM(REGEXP_REPLACE(v_compte, '^["\s]+|["\s]+$', '', 'g'));
        v_ref := TRIM(REGEXP_REPLACE(v_ref, '^["\s]+|["\s]+$', '', 'g'));
        
        -- Récupérer l'idpc du plan comptable
        SELECT idpc INTO v_idpc 
        FROM PlanComptable 
        WHERE code = v_compte OR idpc = v_compte;
        
        IF v_idpc IS NULL THEN
            RAISE NOTICE 'Compte % non trouvé, utilisation du compte par défaut', v_compte;
            -- Option: utiliser un compte par défaut ou lever une exception
            SELECT idpc INTO v_idpc FROM PlanComptable WHERE code = 'DEFAULT' LIMIT 1;
            CONTINUE WHEN v_idpc IS NULL;
        END IF;
        
        -- Insérer dans LigneSaisie selon l'opération
        IF v_operation = 1 THEN
            INSERT INTO LigneSaisie(idso, idpc, libelle, ref, dr, cr)
            VALUES (v_idso, v_idpc, v_libelle, v_ref, v_montant, 0);
        ELSE
            INSERT INTO LigneSaisie(idso, idpc, libelle, ref, dr, cr)
            VALUES (v_idso, v_idpc, v_libelle, v_ref, 0, v_montant);
        END IF;
        
    END LOOP;
    
    RETURN v_idso;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Erreur: % - Texte: %', SQLERRM, v_clean_text;
END;
$$ LANGUAGE plpgsql;