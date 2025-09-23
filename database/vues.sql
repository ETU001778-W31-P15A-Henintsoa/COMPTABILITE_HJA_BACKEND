-- VIEWS
-- VUE UTILISATEUR + TYPE UTILISATEUR
CREATE VIEW V_Utilisateurs AS
    SELECT u.idu, 
       u.nom, 
       u.prenom, 
       u.mail, 
       u.mdp, 
       u.telephone, 
       u.identifiant, 
       u.etat,
       tu.libelle AS typeutilisateur
    FROM Utilisateur u
    LEFT JOIN TypeUtilisateur tu ON u.idtu = tu.idtu;

-- VUE RAPPORT + PlanComptable + DateSaisie + Mois + Saisie
CREATE VIEW V_Saisie AS
    SELECT r.idr,
        r.libelle AS libellerapport,
        r.notation,
        so.mois,
        m.frs,
        so.annee,
        pc.idpc,
        pc.numero AS numeroserie,
        pc.libelle AS intitule,
        ls.libelle AS libelleoperation,
        ls.ref,
        ls.dr,
        ls.cr,
        so.npiece,
        ls.etat AS etatsaisie,
        CONCAT(u.nom || ' ' || u.prenom) AS operateur,
        u.idu AS idutilisateur
    FROM LigneSaisie ls
    LEFT JOIN V_Utilisateurs u ON u.idu = ls.idu
    JOIN SaisieOperation so ON so.idso = ls.idso
    JOIN Rapport r ON r.idr = so.idr
    JOIN PlanComptable pc ON pc.idpc = ls.idpc
    JOIN Mois m ON m.n = so.mois;
