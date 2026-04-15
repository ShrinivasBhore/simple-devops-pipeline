pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                 git 'https://github.com/ShrinivasBhore/simple-devops-pipeline.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building project..."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }
    }
}
