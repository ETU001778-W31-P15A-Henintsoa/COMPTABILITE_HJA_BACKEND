-- DATABASE : comptabilite
CREATE DATABASE comptabilite
WITH ENCODING 'UTF8'
LC_COLLATE='en_US.UTF-8'
LC_CTYPE='en_US.UTF-8'
TEMPLATE=template0;

-- SEQUENCES
CREATE SEQUENCE seqtypeu START 1;
CREATE SEQUENCE sequtilisateur START 1;
CREATE SEQUENCE seqrapport START 1;
CREATE SEQUENCE seqplancomptable START 1;
CREATE SEQUENCE seqtypesaisie START 1;
CREATE SEQUENCE seqsaisieoperation START 1;
CREATE SEQUENCE seqlignesaisie START 1;

-- TYPE UTILISATEUR
CREATE TABLE TypeUtilisateur(
    idtu VARCHAR(6) DEFAULT CONCAT('TU' || NEXTVAL ('seqtypeu')) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL,
    etat INT DEFAULT 1
); 

-- UTILISATEUR
CREATE TABLE Utilisateur(
    idu VARCHAR(10) DEFAULT CONCAT('U' || NEXTVAL('sequtilisateur')) PRIMARY KEY,
    identifiant VARCHAR(30) NOT NULL UNIQUE,
    nom VARCHAR(30) NOT NULL,
    prenom VARCHAR(30) NOT NULL,
    mail VARCHAR(30) NOT NULL UNIQUE,
    mdp VARCHAR(10) NOT NULL,
    idtu VARCHAR(6) REFERENCES TypeUtilisateur(idtu),
    etat INT DEFAULT 1
);
ALTER TABLE Utilisateur ADD COLUMN telephone VARCHAR(15);

-- RAPPORT
CREATE TABLE Rapport(
    idr VARCHAR(10) DEFAULT CONCAT('R' || NEXTVAL('seqrapport')) PRIMARY KEY,
    libelle VARCHAR(20) NOT NULL,
    notation VARCHAR(10) NOT NULL,
    etat INT DEFAULT 1
);

-- PLAN COMPTABLE
CREATE TABLE PlanComptable(
    idpc VARCHAR(50) DEFAULT CONCAT('PC' || NEXTVAL('seqplancomptable')) PRIMARY KEY,
    numero VARCHAR(6) NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    etat INT DEFAULT 1
);

-- MOIS
CREATE TABLE MOIS(
    n INT NOT NULL,
    frs VARCHAR(10) NOT NULL 
);

-- DATESAISIE
CREATE TABLE SaisieOperation(
    idso VARCHAR(50) DEFAULT CONCAT('SO' || NEXTVAL('seqsaisieoperation')) PRIMARY KEY,
    mois INT NOT NULL,
    annee INT NOT NULL,
    npiece VARCHAR(15) UNIQUE, 
    idr VARCHAR(10) REFERENCES Rapport(idr)
);

-- SAISIE
CREATE TABLE LigneSaisie(
    idls VARCHAR(100) DEFAULT CONCAT('LS' || NEXTVAL('seqlignesaisie')) PRIMARY KEY,
    idso VARCHAR(50) REFERENCES SaisieOperation(idso),
    idpc VARCHAR(50) REFERENCES PlanComptable(idpc),
    idu VARCHAR(10) REFERENCES Utilisateur(idu),
    libelle VARCHAR(50) NOT NULL,
    ref VARCHAR(15) UNIQUE,
    dr DOUBLE PRECISION  DEFAULT 0,
    cr DOUBLE PRECISION  DEFAULT 0,
    etat INT DEFAULT 1    
);


