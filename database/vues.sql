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
    JOIN TypeUtilisateur tu ON u.idtu = tu.idtu;

-- VUE RAPPORT + PlanComptable + DateSaisie + Mois + Saisie
CREATE VIEW V_Saisie AS
    SELECT r.idr,
        r.libelle AS libellerapport,
        r.notation,
        ts.idts,
        ts.libelle AS typesaisie,
        ds.mois,
        m.frs,
        ds.annee,
        pc.idpc,
        pc.numero AS numeroserie,
        pc.libelle AS intitule,
        s.libelle AS libelleoperation,
        s.ref,
        s.dr,
        s.cr,
        s.npiece,
        s.etat AS etatsaisie,
        CONCAT(u.nom || ' ' || u.prenom) AS operateur,
        u.idu AS idutilisateur
    FROM Saisie s
    JOIN V_Utilisateurs u ON u.idu =  s.idu
    JOIN Rapport r ON r.idr = s.idr
    JOIN TypeSaisie ts ON ts.idts = s.idts
    JOIN DateSaisie ds ON ds.idds =  s.idds
    JOIN PlanComptable pc ON pc.idpc =  s.idpc
    JOIN Mois m ON m.n = ds.mois;
