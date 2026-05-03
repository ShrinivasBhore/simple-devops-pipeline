 pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ShrinivasBhore/simple-devops-pipeline.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building project..."
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }
    }
 }
