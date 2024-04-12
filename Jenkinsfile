pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node:14' // Docker image to use for building the application
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Build the application within a Docker container
                script {
                    docker.build DOCKER_IMAGE, '-f Dockerfile .'
                }
            }
        }
        stage('Test') {
            steps {
                // Run tests within the Docker container
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        // Add your testing commands here
                        sh 'npm test' // Or any other test command for your web application
                    }
                }
            }
        }
    }
}
