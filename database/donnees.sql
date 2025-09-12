-- Donnees MOIS
INSERT INTO Mois(n, frs) VALUES
    (1, 'Janvier'),
    (2, 'Fevrier'),
    (3, 'Mars'),
    (4, 'Avril'),
    (5, 'Mai'),
    (6, 'Juin'),
    (7, 'Juillet'),
    (8, 'Aout'),
    (9, 'Septembre'),
    (10, 'Octobre'),
    (11, 'Novembre'),
    (12, 'Decembre');

-- Types utilisateur
INSERT INTO TypeUtilisateur(libelle) VALUES
    ('Consultant'),
    ('Administrateur');

-- Utilisateurs
INSERT INTO Utilisateur(identifiant, nom, prenom, email, mdp, telephone) VALUES
    ('HJA', 'HERINJANAHARY', 'Jean Aimé', 'hja@gmail.com', 'password', '0321234567');

-- Type de saisie
INSERT INTO TypeSaisie(libelle) VALUES
    ('Mensuel');

-- Rapports
INSERT INTO Rapport(libelle, notation) VALUES
    ('Cheque emis', '1'),
    ('Versement caissier', '3'),
    ('Rapport financier', '4');

-- Plan Comptable
INSERT INTO PlanComptable(numero, libelle) VALUES
    ('512', 'Banque'),
    ('531', 'Caisse');

-- Regle Comptabilite
INSERT INTO regleComptabilite (dr, cr) VALUES
    ('PC1', 'PC2'),
    ('PC2', 'PC1');