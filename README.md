
প্লেরাইট (Playwright) প্রজেক্ট সেটআপ করার পূর্ণাঙ্গ গাইড
আপনার পিসিতে অটোমেশন টেস্টগুলো চালানোর জন্য নিচের ধাপগুলো ক্রমানুসারে অনুসরণ করুন:
ধাপ ১: Node.js ইনস্টল ও চেক করা
প্রথমে Node.js অফিসিয়াল ওয়েবসাইট থেকে LTS ভার্সনটি ডাউনলোড করে ইনস্টল করুন।
ইনস্টল হয়েছে কি না তা নিশ্চিত করতে টার্মিনাল বা CMD-তে নিচের কমান্ডটি দিয়ে চেক করুন:
node -v

(যদি ভার্সন নম্বর দেখায়, তবে বুঝবেন ইনস্টলেশন সঠিক হয়েছে)।
ধাপ ২: গিট (Git) থেকে প্রজেক্ট ক্লোন করা
আপনার পছন্দের ফোল্ডারে গিয়ে টার্মিনাল ওপেন করুন এবং নিচের কমান্ডটি দিয়ে গিট রিপোজিটরি থেকে প্রজেক্টটি ডাউনলোড করুন:
git clone [https://github.com/ekramulsqaengineer/frontend-app-Playwright-tests.git](https://github.com/ekramulsqaengineer/frontend-app-Playwright-tests.git)


ধাপ ৩: প্রজেক্ট ফোল্ডারে প্রবেশ এবং CMD ওপেন
প্রজেক্টটি ক্লোন হওয়ার পর সেই ফোল্ডারের ভেতরে প্রবেশ করুন।
ফোল্ডারের অ্যাড্রেস বারে cmd লিখে এন্টার (Enter) প্রেস করুন।
ধাপ ৪: VS Code-এ প্রজেক্ট ওপেন করা
টার্মিনাল বা CMD-তে নিচের কমান্ডটি দিয়ে সরাসরি ভিজ্যুয়াল স্টুডিও কোডে প্রজেক্টটি ওপেন করুন:
code .


ধাপ ৫: প্রয়োজনীয় প্যাকেজ বা ডিপেনডেন্সি ইনস্টল করা
প্রজেক্টটি ওপেন হওয়ার পর VS Code-এর টার্মিনালে নিচের কমান্ডটি অবশ্যই রান করবেন (এটি আপনার রিপোজিটরির সব প্রয়োজনীয় ফাইল ডাউনলোড করবে):
npm install


ধাপ ৬: প্লেরাইট ব্রাউজার ইনস্টল করা
প্লেরাইট যাতে ব্রাউজারগুলো (Chromium, Firefox, Webkit) কন্ট্রোল করতে পারে, সেজন্য নিচের কমান্ডটি দিন:
npx playwright install


ধাপ ৭: টেস্ট রান করা
সবকিছু সেটআপ হয়ে গেলে নিচের কমান্ড দিয়ে টেস্টগুলো রান করুন:
npx playwright test

ধাপ ৮: নির্দিষ্ট একটি ফাইল রান করা (সবচেয়ে সহজ পদ্ধতি)
আপনি যদি শুধু একটি নির্দিষ্ট ফাইল রান করতে চান, তবে কমান্ড প্রম্পট বা টার্মিনালে ফাইলের পুরো নামসহ পাথ লিখে এন্টার দিন:
npx playwright test tests/Login_with_Valid_Credentials.ts --headed


(এখানে tests/ হলো আপনার ফোল্ডারের নাম। আপনার ফোল্ডারের নাম অনুযায়ী এটি পরিবর্তন করুন)
ধাপ ৯: ফাইলের নামের অংশ বিশেষ দিয়ে রান করা
পুরো পাথ না লিখে ফাইলের নামের কিছু অংশ দিয়েও রান করা যায়:
npx playwright test Login --headed


এই কমান্ডটি দিলে নামের মধ্যে Login আছে এমন সব ফাইল রান হবে।
ধাপ ১০: UI মোড ব্যবহার করা (সুপারিশকৃত)
সবচেয়ে সহজ এবং ভিজ্যুয়াল উপায় হলো Playwright-এর UI Mode ব্যবহার করা। এটি দিলে একটি উইন্ডো ওপেন হবে যেখানে বাম পাশে সব ফাইলের লিস্ট থাকবে এবং আপনি যেটির ওপর ক্লিক করবেন সেটিই রান হবে।
npx playwright test --ui


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Complete Guide for Playwright Project Setup
Follow these steps in order to set up and run automation tests on your PC:
Step 1: Install and Check Node.js
First, download and install the LTS version from the official Node.js website.
To confirm the installation, open your Terminal or CMD and run the following command:
node -v

(If a version number is displayed, the installation was successful).
Step 2: Clone Project from Git
Go to your preferred folder, open the terminal, and download the project from the Git repository using the following command:
git clone [https://github.com/ekramulsqaengineer/frontend-app-Playwright-tests.git](https://github.com/ekramulsqaengineer/frontend-app-Playwright-tests.git)


Step 3: Navigate to Project Folder and Open CMD
After cloning the project, enter that specific folder.
Type cmd in the folder's address bar and press Enter.
Step 4: Open Project in VS Code
In the Terminal or CMD, run the following command to open the project directly in Visual Studio Code:
code .


Step 5: Install Required Packages or Dependencies
After the project opens, run the following command in the VS Code terminal (this will download all necessary files for your repository):
npm install


Step 6: Install Playwright Browsers
Run the following command so that Playwright can control browsers (Chromium, Firefox, Webkit):
npx playwright install


Step 7: Run Tests
Once everything is set up, execute the tests using the following command:
npx playwright test

Step 8: Running a Specific File (Easiest Way)
If you want to run only one specific test file, provide the full path to the file:
npx playwright test tests/Login_with_Valid_Credentials.test.ts --headed


(Note: Replace tests/ with your actual folder name if different).
Step 9:  Running by File Name Keyword
You can run all files that contain a specific keyword in their name:
npx playwright test Login --headed


This command will run all test files that have "Login" in their filename.
Step 10: Using UI Mode (Recommended)
The most user-friendly and visual way is to use Playwright's UI Mode. This opens a window where you can see all files on the left and run them individually with a click:
npx playwright test --ui

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

