 pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {
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