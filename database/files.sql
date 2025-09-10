-- =========================================
-- Tabla de usuarios
-- =========================================
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carne VARCHAR(9) UNIQUE NOT NULL,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    hash CHAR(64) NOT NULL, -- contraseña en hash
    rol ENUM('EST','CAT') DEFAULT 'EST' NOT NULL
);

-- =========================================
-- Tabla de cursos
-- =========================================
CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    creditos TINYINT NOT NULL,
    tieneLab TINYINT(1) DEFAULT 0 -- 0 = falso, 1 = verdadero
);

-- =========================================
-- Tabla de secciones
-- =========================================
CREATE TABLE seccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCurso INT NOT NULL,
    idCatedratico INT NOT NULL,
    codigoSeccion VARCHAR(10) NOT NULL,
    cupo INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES curso(id) ON DELETE CASCADE,
    FOREIGN KEY (idCatedratico) REFERENCES usuario(id) ON DELETE CASCADE
);

-- =========================================
-- Tabla de publicaciones
-- =========================================
CREATE TABLE publicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idCurso INT,
    idCatedratico INT,
    mensaje TEXT NOT NULL,
    rating FLOAT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (idCurso) REFERENCES curso(id) ON DELETE SET NULL,
    FOREIGN KEY (idCatedratico) REFERENCES usuario(id) ON DELETE SET NULL,
    CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5))
);

-- =========================================
-- Tabla de comentarios
-- =========================================
CREATE TABLE comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idPublicacion INT NOT NULL,
    idUsuario INT NOT NULL,
    texto TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPublicacion) REFERENCES publicacion(id) ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- =========================================
-- Tabla de asignaciones (muchos a muchos usuario-seccion)
-- =========================================
CREATE TABLE asignacion (
    idUsuario INT NOT NULL,
    idSeccion INT NOT NULL,
    PRIMARY KEY (idUsuario, idSeccion),
    FOREIGN KEY (idUsuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (idSeccion) REFERENCES seccion(id) ON DELETE CASCADE
);
