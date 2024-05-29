## About The Project

![Alt text](https://github.com/kevinyen83/PawsAndHearts/blob/main/screenshots/adoption.png)



Paws and Hearts is an exciting new side project that combines my passion for animals with my skills in full-stack development. Having volunteered at a Sydney animal shelter, I understand the importance of creating a seamless and user-friendly experience for both potential adopters and shelter staff.

With Paws and Hearts, I aim to leverage the latest programming tools and JavaScript frameworks to revolutionize the animal adoption process. From streamlining application procedures to securely managing user data, this project is all about making the adoption journey as smooth and enjoyable as possible.

I'm committed to continuously optimizing the website and welcome any feedback or collaboration opportunities. Together, we can make a real difference in the lives of animals in need!

**Related GitHub Repo**
- **Paws And Hearts-Pet Profile GraphQL API**: https://github.com/kevinyen83/PawsAndHearts-AWSSAM-GraphQL-API/blob/main/README.md

## Live Demo

live demo [here](https://paws-and-hearts.vercel.app/)

### Core Features

1.  Authentication  
    1-1. SignIn  
    1-2. SignUp

2.  Payment (Donation)  
    2-1. Select Donation Plans  
    2-2. Support Credit Cards, such as Visa, Master and so on

3.  Landing page  
    3-1. Showcase Pets with a Carousel  
    3-2. Provide Donation Information

4.  Adoption Page  
    4-1. Display Pet Cards and detailed information  
    4-2. Ability to Add Pets to Favorites  
    4-3. Adoption Application Process
    4-4. Map-popup (27 May 2024 New release!)

6.  Paw Profile Page (9 April 2024 New release!)
    5-1. Create a new pet profile after logging into a user account
 

### Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![jest](https://jestjs.io/img/jest-badge.svg)
![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

1.  UI Design: Figma
2.  Front-end web development: React.JS, Redux, TypeScript, Tailwind CSS, CSS Animations, Formik & Yup(Form validation)
3.  Server-side rendering: Next.JS
4.  AWS Serverless: AWS Lambda, AWS API Gateway, Node.JS, DynamoDB
5.  API: RESTful API, GraphQL
6.  Auth: AWS Cognito, NextAuth.JS, uuid
7.  Integration and E2E testing: Jest, React Testing Library, Cypress
8.  Payment: Stripe
9.  Map: Mapbox GL
10. CI/CD & DevOps: Vercel, Docker

## Getting Started with Docker

### Prerequisites

Install Docker:
https://www.docker.com/get-started/

### Installation

1.  Pull the Docker Image
    ```sh
    docker pull kevinyen83/paws-and-hearts:latest
    ```
2.  Run the Docker Container
    ```sh
    docker run -p 3000:3000 kevinyen83/paws-and-hearts:latest
    ```
3.  Access the Application
After running the Docker container, you can access the application in your web browser by navigating to http://localhost:3000.


## Getting Started with GitHub

To install and run the project on your local, you will need node and npm installed globally on your machine.

Please follow these steps:

### Prerequisites

Install npm:

  ```sh
  npm install -g npm
  ```

### Installation

1.  Clone the repo in your root file
    ```sh
    git clone https://github.com/kevinyen83/PawsAndHearts.git
    ```
2.  Navigate to the project file
    ```sh
    cd PawsAndHearts
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Start React app

1. Please execute the following command:

```sh
npm run dev
```
2. Please open http://localhost:3000 with your browser.


### SignIn

Please utilize the following test account details:

```sh
Email: test123@gmail.com
Password: Test123*
```

### Payment (Donation)

Please utilize the following test payment account details:

```sh
Email: test123@gmail.com
Account: 4242 4242 4242 4242
MM/YY: 12/34
CVC: 567
CardholderName: tes123
CountryOrRegion: Australia
```

### Testing

1.  To conduct local testing, please open your web browser and navigate to http://localhost:3000/.
2.  Please execute the following command:

```sh
npm test
```

## Roadmap

- [x] Setup AWS serverless infrastructure
- [x] Develop Lambda API
- [x] Authentication
- [x] Implement Authentication
- [x] Design & develop Landing Page
- [x] Design & develop Adoption Page
- [x] Integrate Jest for testing
- [x] Create a Docker image
- [x] Build payment (Donation) process
- [x] Complete RWD
- [x] Create Docker
- [x] Developing a content management page that allows shelters to upload and manage their animals
- [x] Add E2E tests by Cypress
- [x] Added Redux 
- [x] Add new map features by Mapbox GL
- [ ] Improve image rendering performance using <Image>

## Contact

Currently looking for Front End Developer position in Sydney.
If you have any feedback or job opportunities, please feel free to contact me via LinkedIn / Email!

Kevin Yen - [@Kevin_linkedIn](https://www.linkedin.com/in/kerwinyen83/) - kevinyenhaha@gmail.com
