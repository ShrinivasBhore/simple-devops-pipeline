 pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ShrinivasBhore/simple-devops-pipeline.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building project..."
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }
    }
 }
