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
INSERT INTO Utilisateur(identifiant, nom, prenom, mail, mdp, telephone, idtu) VALUES
    ('HJA', 'HERINJANAHARY', 'Jean Aimé', 'hja@gmail.com', 'password', '0321234567', 'TU1');

-- Rapports 
INSERT INTO Rapport(libelle, notation) VALUES
    ('Sortie Caisse', '1'),
    ('Sortie Banque', '2'),
    ('Entree Caisse', '3'),
    ('Resume Financier', '4'),
    ('Operations Diverses', '5'),
    ('Entree Banque', '6');

-- Plan Comptable
INSERT INTO PlanComptable(numero, libelle) VALUES
    ('512', 'Banque'),
    ('531', 'Caisse');
