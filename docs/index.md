title: Simple Alliance Scouting Framework

The Simple Alliance Scouting Framework is a simple, easy-to-use framework for creating scouting apps for the FIRST Robotics Competition. <br />
It is built using React, and is designed to be easy to use for people with little to no coding experience. <br />
It is also designed to be easily customizable so you can make your app look however you want. <br />
<br/>
One of the main strengths of this framework is that it can be used to create a scouting app for any game, not just the current one. <br />
Meaning, you can use this framework to create a scouting app for the 2030 season, even though we have no idea what it will entail. (shout out to my friends in 2030)

[Example form for 2023](https://simple-asf.vercel.app/)


# Setup

## Requirements 

-  Code Editor (Github Codespaces are nice, and are free for students)
-  Npm (Pre-installed on all Github Codespaces)
-  Firebase Account
-  Vercel Account
## Firebase Setup:
[Follow these instructions set up your Firebase realtime database](https://firebase.google.com/docs/web/setup)*

***IMPORTANT: Only do steps 1-2 and make sure to read the notes below!!!**

!!!Notes
    - Make sure that you keep Google Analytics enabled when prompted
    - Use "Default account for firebase" when prompted for the Google Analytics account
    - When shown the React Firebase Config code, copy the variable values and paste them into their corresponding places in the ``.env`` following the format below
      - The ``.env`` file is located in the root directory of the project
      - The ``.env`` file is hidden by default, so you may need to enable hidden files to see it
      - You won't need any of the other code that is shown, just the variable values
<br/>

```
REACT_APP_API_KEY = [API_KEY]
REACT_APP_AUTH_DOMAIN = [AUTH_DOMAIN]
REACT_APP_PROJECT_ID = [PROJECT_ID]
REACT_APP_STORAGE_BUCKET = [STORAGE_BUCKET]
REACT_APP_MESSAGING_SENDER_ID = [MESSAGING_SENDER_ID]
REACT_APP_APP_ID = [APP_ID]
REACT_APP_MEASUREMENT_ID = [MEASUREMENT_ID]
```

In the end, your .env file should look something like this:

```
REACT_APP_API_KEY = 1234567890
REACT_APP_AUTH_DOMAIN = 1234567890
REACT_APP_PROJECT_ID = 1234567890
REACT_APP_STORAGE_BUCKET = 1234567890
REACT_APP_MESSAGING_SENDER_ID = 1234567890
REACT_APP_APP_ID = 1234567890
REACT_APP_MEASUREMENT_ID = 1234567890
```

Navigate to your Firebase console, click on the build dropdown, and click on ``Realtime Database``<br />
Click on ``Create Database``, click ``Next``, select ``Start in test mode``, and select "Enable"<br />
Save the URL of the page you're currently on, this is where you will be able to view your database<br />
Finally, go to the tab that says ``Rules`` and replace the code with the following:
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Press ``Publish`` and you're done with the Firebase setup!

## Installing Dependencies 

In your terminal, run ``npm install`` in the root directory of the project. <br />


## Building a Scouting App 
Included in this repository is the layout for a basic scouting app for the 2023 season as a demo.  <br />

**You can get a copy of this repository by running ``git clone https://github.com/Faraday-dot-py/Simple-ASF.git`` in your terminal**
<br />

### Seeing your app for the first time 

This one is pretty simple. <br/>
In your terminal, run ``npm start`` in the root directory of the project.<br/>
A new tab should open in your browser with the example app. You won't be using this, so you can delete it :)

### All the widgets you need 

A **widget** is a component that renders a specific part of the app. <br />
There are many widgets that you can use to build your app,
all of which are located in the ``src/widgets`` directory. <br />

All widgets need a certain set of parameters, or props, to work. <br />
Most are different depending on what widget you are rendering, but all widgets need a ``type`` prop to tell the compiler what you want to render. <br/>
All widgets also need a ``title`` prop, which is the title of the widget. <br />
Finally, any input can have a ``value`` prop, which is the initial value of the input when the page first loads **(DIFFERENT THAN THE ``resetToValue``)**. <br />
### 1. Header

- **Widget Type**: `header`
- **Widget Props**:
  - **`type*` (Required)**: The type of the widget, must be "header".
  - **`value*` (Required)**: The text content of the header.
  - **`decorator`**: A decorator or style identifier for the header (optional).

### 2. Label
- **Widget Type**: `label`
- **Widget Props**:
  - **`type*` (Required)**: The type of the widget, must be "label".
  - **`value*` (Required)**: The text content of the label.
  - **`decorator`**: A decorator or style identifier for the label (optional).

### 3. Textbox

- **Widget Type**: `textbox`
- **Widget Props**:
  - **`title*` (Required)**: The title of the textbox.
  - **`type*` (Required)**: The type of the widget, must be "textbox".
  - **`value`**: The initial value of the textbox.
  - **`required`**: Indicates whether the field is required.
  - **`resetToValue`**: The value to reset the textbox to.
  - **`decorator`**: A decorator or style identifier for the textbox (optional).

### 4. Checkbox

- **Widget Type**: `checkbox`
- **Widget Props**:
  - **`title*` (Required)**: The title of the checkbox.
  - **`type*` (Required)**: The type of the widget, must be "checkbox".
  - **`value`**: The initial value of the checkbox.

### 5. Counter

- **Widget Type**: `counter`
- **Widget Props**:
  - **`title*` (Required)**: The title of the counter.
  - **`type*` (Required)**: The type of the widget, must be "counter".
  - **`value`**: The initial value of the counter.
  - **`increment`**: The value to increment or decrement by.
  - **`resetToValue`**: The value to reset the counter to.
  - **`maxValue`**: The maximum allowed value.
  - **`minValue`**: The minimum allowed value.

### 6. Textbox Long

- **Widget Type**: `textboxlong`
- **Widget Props**:
  - **`title*` (Required)**: The title of the long textbox.
  - **`type*` (Required)**: The type of the widget, must be "textboxlong".
  - **`value`**: The initial value of the long textbox.
  - **`resetToValue`**: The value to reset the long textbox to.

### 7. Dropdown

- **Widget Type**: `dropdown`
- **Widget Props**:
  - **`title*` (Required)**: The title of the dropdown.
  - **`type*` (Required)**: The type of the widget, must be "dropdown".
  - **`value`**: The initial value of the dropdown.
  - **`options*` (Required)**: An array of options for the dropdown.
  - **`resetToValue`**: The value to reset the dropdown to.

### 8. Submit

- **Widget Type**: `submit`
- **Widget Props**:
  - **`title*` (Required)**: The title of the submit button.
  - **`type*` (Required)**: The type of the widget, must be "submit".

<br/>
<br/>

These widgets should be put into the ``/src/layout.json`` file as an array of dictionaries. <br />
An example form for the 2023 season is included in the repository when it is first cloned.

## Additional Configuration 

In addition to the ``/src/layout.json`` file, there are two other files that you will need to edit to get your app working. <br />
The first is the ``/src/config.json`` file. This file contains the configuration for the app, such as the title and the Firebase database URL. <br />
The second is the ``/src/.env`` file. This file contains the configuration for the Firebase database, which you should have already set up. <br />


### `sortMetrics` Parameter

The `sortMetrics` parameter is an array of strings that determines how the database is sorted within the application. Each string in the array corresponds to the title of a valid input field, and the database will be sorted based on the specified metrics. In the provided example, `sortMetrics` is defined as `["Match Number", "Name"]`, indicating that the database should be sorted first by "Match Number" and then by "Name".

### `renderRequiredStars` Parameter

The `renderRequiredStars` parameter is a boolean that controls whether asterisks are appended to the end of any field that is marked as required. When set to `true`, the application will visually indicate required fields by adding an asterisk to their labels. In the example configuration, `renderRequiredStars` is set to `true`, enabling this feature.

### Usage in Configuration Files

When editing the ``/src/config.json`` file, stay above the line, you only need to edit the ``sortMetrics`` and ``renderRequiredStars`` parameters. <br /><br />
You can also change the title of the app by going to the ``package.json`` file and changing the ``name`` parameter. <br /><br />
The final thing that you may want to edit is the ``/src/App.css`` file. This file contains the CSS for the app, and you can edit it to change the look of your app. <br />
There is already premade CSS, so I wouldn't mess with it unless you know what you are doing. <br />

## Deploying your app 
Once you have finished editing your app, you can deploy it to the web. <br />
Vercel makes this super simple, all you have to do is:
1. Create a Vercel account
Navigate to [vercel.com](https://vercel.com) and create an account. <br />

2. Link your repo
Once you have created an account, click the "Add New" > "Project" button in the top right corner. <br />

    1. Follow the prompts to link the proper GitHub repository. <br />

    2. Rename the project to whatever you want. <br />

    3. Add environment variables
    Open the "Environment Variables" dropdown in the project settings. <br />
    Copy the entirety of your ``.env`` file into the ``key`` field, and it should auto-populate with all of your environment variables <br />
    If this doesn't work for some reason, you can manually add each environment variable. <br />
    **Note: Make sure that all spelling and capitalization are correct, otherwise your app will not work.** (Copy and paste what you can)<br />

4. Deploy your app
Click the "Deploy" button at the bottom<br />

After waiting about a minute, your app should be deployed! <br />
Navigate to the URL that Vercel gives you to see your app in action. <br />

Verify that it works by submitting a form and navigating to [Your Firebase Dashboard](https://console.firebase.google.com), selecting your project, and opening the Realtime Database on the left panel  <br />
In there should be the data that you just submitted. <br />


The nice thing about Vercel, is that it will automatically update your website for you whenever you push to the main branch of your repository. <br />
So if you want to change the way that your form looks, all you have to do is edit it and push it to Github. <br />
