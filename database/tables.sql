CREATE SEQUENCE seqTypeUtilisateur;
CREATE TABLE typeUtilisateur (
    id VARCHAR(20) PRIMARY KEY DEFAULT 'TYU' || nextval('seqTypeUtilisateur'),
    type VARCHAR(250) NOT NULL
);


CREATE SEQUENCE seqUtilisateur;
CREATE TABLE utilisateur (
    idUtilisateur VARCHAR(20) PRIMARY KEY DEFAULT 'UTI' || nextval('seqUtilisateur'),
    nom VARCHAR(100) NOT NULL,
    prenoms VARCHAR(150) NOT NULL,
    telephone VARCHAR(50),
    mail VARCHAR(150) UNIQUE,
    typeUtilisateur VARCHAR(20) NOT NULL REFERENCES typeUtilisateur(id),
    etat INT DEFAULT 1 
);
