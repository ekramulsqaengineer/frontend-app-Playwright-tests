PC Setup Guide for Running Playwright Tests
<<<<<<< HEAD
Follow the steps below to set up your PC environment for running automation tests:

1. Install Node.js
Visit the official Node.js website.
Download and install the LTS (Recommended for most users) version.
=======

Follow the steps below to set up your PC environment for running automation tests:
1. Install Node.js
Visit the official Node.js website.
Download and install the LTS (Recommended for most users) version.

>>>>>>> 3a71bfed69efc8cb68cca9425c0cd4282b443787
To verify the installation, open your Terminal or Command Prompt and type the following command:
node -v

(If a version number appears, the installation was successful).
<<<<<<< HEAD

=======
>>>>>>> 3a71bfed69efc8cb68cca9425c0cd4282b443787
2. Initialize the Project
Open the terminal in the folder where your test files are located and run the following command to create a package.json file:
npm init -y


<<<<<<< HEAD
=======

>>>>>>> 3a71bfed69efc8cb68cca9425c0cd4282b443787
3. Install Playwright
Run the following command in your terminal:
npm init playwright@latest


Press Enter (Default) for all prompts during the installation process.
4. Run Tests
Once everything is set up, use the following command to execute your tests:
npx playwright test

<<<<<<< HEAD

5. View Reports
To view a detailed report after the tests are completed:
npx playwright show-report
=======
Press Enter (Default) for all prompts during the installation process.
4. Run Tests
Once everything is set up, use the following command to execute your tests:
npx playwright test


>>>>>>> 3a71bfed69efc8cb68cca9425c0cd4282b443787

5. View Reports
To view a detailed report after the tests are completed:
npx playwright show-report

<<<<<<< HEAD
Tips: If you are using Visual Studio Code (VS Code), install the Playwright Test for VSCode extension to make running and debugging tests much easier...........
=======

Tips: If you are using Visual Studio Code (VS Code), install the Playwright Test for VSCode extension to make running and debugging tests much easier.
>>>>>>> 3a71bfed69efc8cb68cca9425c0cd4282b443787
