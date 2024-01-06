# Setup

## Requirements

-  Code Editor (Github Codespaces are nice, which are free for students)
-  Npm (Pre-insalled on all Github Codespaces)
-  Firebase Account

- - -

## Firebase Setup:
[Follow these instructions to step two to setup your firebase realtime database](https://firebase.google.com/docs/web/setup)
!!!Note
    - Make sure that you keep Google Analytics enabled when prompted
    - Use "Default account for firebase" when promted for the google analytics account

Grab the **Firebase project configuration** code snippet and edit it so that it looks like this:
```
REACT_APP_API_KEY = [API_KEY]
REACT_APP_AUTH_DOMAIN = [AUTH_DOMAIN]
REACT_APP_PROJECT_ID = [PROJECT_ID]
REACT_APP_STORAGE_BUCKET = [STORAGE_BUCKET]
REACT_APP_MESSAGING_SENDER_ID = [MESSAGING_SENDER_ID]
REACT_APP_APP_ID = [APP_ID]
RconsoleEACT_APP_MEASUREMENT_ID = [MEASUREMENT_ID]
```
Paste the edited Firebase project config into the ``.env`` file in the root directory of the project.

Navigate to your firebase console and click on the build dropdown, and click on ``Realtime Database``

Click on ``Create Database``, click ``Next``, select ``Start in test mode``, and select "Enable"

Save the URL of the page you're currently on, this is where you will be able to view your database

Finally, go to the tab that says ``Rules`` and replace the code with the following:
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Press ``Publish`` and you're done with Firebase setup!
- - -

## Installing Dependencies

Installing dependencies is done with ``npm install [package name]``
Here are the dependencies that you will need to install:
- firebase
- react
- uuidv4

- - -

## Building a Scouting App
Included in this repository is the layout for a basic scouting app for the 2023 season as a demo.

You can use this as a template for your own scouting app.


!!!Clone Repo
    **You can get a copy of this repository by running `git clone https://github.com/Faraday-dot-py/Simple-ASF.git` in your terminal**



### Seeing your app for the first time
This one is pretty simple. 

In your terminal, run ``npm start`` in the root directory of the project. 

A new tab should open in your browser with the example app. 

You won't be using this, so you can delete it :)

### All the widgets you need

A **widget** is a component that renders a specific part of the app. 

There are many widgets that you can use to build your app,
all of which are located in the ``src/widgets`` directory. 


All widgets need a certain set of parameters, or props, to work. 

Most are different depending on what widget you are rendering, but all widgets need a ``type`` prop to tell the compiler what you want to render. 

All widgets also need a ``title`` prop, which is the title of the widget. 

Finally, any input can have a ``value`` prop, which is the initial value of the input when the page first loads **(DIFFERENT THAN THE ``resetToValue``)**. 

#### 1. Header
!!!Header
    - **Widget Type**: `header`
    - **Widget Props**:
    - **`type*` (Required)**: The type of the widget, must be "header".
    - **`value*` (Required)**: The text content of the header.
    - **`decorator`**: A decorator or style identifier for the header (optional).

#### 2. Label
!!!Label
    - **Widget Type**: `label`
    - **Widget Props**:
    - **`type*` (Required)**: The type of the widget, must be "label".
    - **`value*` (Required)**: The text content of the label.
    - **`decorator`**: A decorator or style identifier for the label (optional).

#### 3. Textbox
!!!Textbox
    - **Widget Type**: `textbox`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the textbox.
    - **`type*` (Required)**: The type of the widget, must be "textbox".
    - **`value`**: The initial value of the textbox.
    - **`required`**: Indicates whether the field is required.
    - **`resetToValue`**: The value to reset the textbox to.
    - **`decorator`**: A decorator or style identifier for the textbox (optional).

#### 4. Checkbox
!!!Checkbox
    - **Widget Type**: `checkbox`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the checkbox.
    - **`type*` (Required)**: The type of the widget, must be "checkbox".
    - **`value`**: The initial value of the checkbox.

#### 5. Counter
!!!Counter
    - **Widget Type**: `counter`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the counter.
    - **`type*` (Required)**: The type of the widget, must be "counter".
    - **`value`**: The initial value of the counter.
    - **`increment`**: The value to increment or decrement by.
    - **`resetToValue`**: The value to reset the counter to.
    - **`maxValue`**: The maximum allowed value.
    - **`minValue`**: The minimum allowed value.

#### 6. Textbox Long
!!!Textbox-Long
    - **Widget Type**: `textboxlong`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the long textbox.
    - **`type*` (Required)**: The type of the widget, must be "textboxlong".
    - **`value`**: The initial value of the long textbox.
    - **`resetToValue`**: The value to reset the long textbox to.

#### 7. Dropdown
!!!Dropdown
    - **Widget Type**: `dropdown`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the dropdown.
    - **`type*` (Required)**: The type of the widget, must be "dropdown".
    - **`value`**: The initial value of the dropdown.
    - **`options*` (Required)**: An array of options for the dropdown.
    - **`resetToValue`**: The value to reset the dropdown to.

#### 8. Submit
!!!Submit
    - **Widget Type**: `submit`
    - **Widget Props**:
    - **`title*` (Required)**: The title of the submit button.
    - **`type*` (Required)**: The type of the widget, must be "submit".





These widgets should be put into the ``/src/layout.json`` file as an array of dictionaries. 

An example form for the 2023 season is included in the repository when it is first cloned.

<h3> Additional Configuration </h3>
In addition to the ``/src/layout.json`` file, there are two other files that you will need to edit to get your app working. 

The first is the ``/src/config.json`` file. This file contains the configuration for the app, such as the title and the firebase database URL. 

The second is the ``/src/.env`` file. This file contains the configuration for the firebase database, which you should have already set up. 



### `sortMetrics` Parameter

The `sortMetrics` parameter is an array of strings that determines how the database is sorted within the application. Each string in the array corresponds to the title of a valid input field, and the database will be sorted based on the specified metrics. In the provided example, `sortMetrics` is defined as `["Match Number", "Name"]`, indicating that the database should be sorted first by "Match Number" and then by "Name".

### `renderRequiredStars` Parameter

The `renderRequiredStars` parameter is a boolean that controls whether asterisks are appended to the end of any field that is marked as required. When set to `true`, the application will visually indicate required fields by adding an asterisk to their labels. In the example configuration, `renderRequiredStars` is set to `true`, enabling this feature.

## Usage in Configuration Files

When editing the ``/src/config.json`` file, stay above the line, you only need to edit the ``sortMetrics`` and ``renderRequiredStars`` parameters. 


You can also change the title of the app by going to the ``package.json`` file and changing the ``name`` parameter. 


The final thing that you may want to edit is the ``/src/App.css`` file. This file contains the CSS for the app, and you can edit it to change the look of your app. 

There is already premade CSS, so I wouldn't mess with it unless you know what you are doing. 


## Deploying your app
Once you have finished editing your app, you can deploy it to the web. 

Vercel makes this super simple, all you have to do is:
1. Create a Vercel account
Navigate to [vercel.com](https://vercel.com) and create an account. 


2. Link your repo
Once you have created an account, click the "Add New" > "Project" button in the top right corner. 


Follow the prompts to link the proper Github repository. 


Rename the project to whatever you want. 


3. Add environment variables
Open the "Environment Variables" dropdown in the project settings. 

Copy the entirety of your ``.env`` file into the ``key`` field, and it should auto-populate with all of your environment variables 

If this doesn't work for some reason, you can manually add each environment variable. 

!!!Note
    Make sure that all spelling and capitalization is correct, otherwise your app will not work.** (Copy paste what you can)


4. Deploy your app
Click the "Deploy" button at the bottom


After waiting about a minute, your app should be deployed! 

Navigate to the URL that Vercel gives you to see your app in action. 

And verify that it works by submitting a form and looking at the [Firebase database](https://console.firebase.google.com). 



The nice thing about vercel, is that it will automatically update your website for you whenever you push to the main branch of your repository. 

So if you want to change the way that your form looks, all you have to do is edit it and push it to Github. 
