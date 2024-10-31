#!/usr/bin/env groovy

pipeline {
  agent any

  environment {
        GCR_REGISTRY = 'gcr.io/production-411607'
        IMAGE_NAME = 'lnk-mern-fe'
        SERVICE_NAME = 'lnk-mern-fe'
        GIT_TOKEN_CREDENTIALS_ID = 'attendance-github'
        GIT_CONFIG_TOKEN_CREDENTIALS_ID = 'github-token'
        CGO_ENABLED = 0
        GOOGLE_KEY = 'gcr:google-key'

    }

  stages {
    stage('Cloning Git') {
      steps{
          checkout scm
          withCredentials(bindings: [usernamePassword(credentialsId: 'attendance-github', passwordVariable: 'GITHUB_COMMON_CREDS_USR', usernameVariable: 'GITHUB_COMMON_CREDS_PSW')]) {
        }
      }
    }

    stage('Build Staging - Image') {
      steps {
        script {
            sh 'echo "Build Staging - Image"'
            docker.build("${GCR_REGISTRY}/${IMAGE_NAME}:${env.BRANCH_NAME}")
            echo "prune build cache : ${BRANCH_NAME}"

            sh 'docker builder prune -a'

            // Push the Docker image to GCR
            docker.withRegistry('https://gcr.io', GOOGLE_KEY) {
                docker.image("${GCR_REGISTRY}/${IMAGE_NAME}:${env.BRANCH_NAME}").push()
            }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
            echo "Clean obsolete image : ${BRANCH_NAME}"

            // Stop the old container (assuming it is running)
            sh '''

                if docker ps | grep ${IMAGE_NAME}; then
                    docker stop ${IMAGE_NAME}
                else
                    echo "Container not running"
                fi
                if docker images | grep  $container_name; then
                    echo "Container already exist, remove container"
                    docker rm ${GCR_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}
                fi

            '''
            // Optionally, clean up unused images or containers
            sh 'docker image prune -f'
            sh 'docker container prune -f'

            echo "Run fresh container"

            sh 'docker run -d --name ${IMAGE_NAME} --network app-network -p 3003:3000 ${GCR_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}'

            echo "Deployment completed for branch: ${BRANCH_NAME}"
        }
        
      }
    }
    // ------------------------------------------------------------------------

    
  }
  post {
        always {
            cleanWs()
        }
    }
}