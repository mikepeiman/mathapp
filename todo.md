# For Math App

## General todo and ideas
* provide a view-switching tab/iconset at top to switch between calculator, flashcard, and worksheet modes
  * provide a print option for worksheets
  * allow user to select number of problems per page (within a reasonable range) and problem scope (digits per value, construction of problems)
* add user accounts, login/auth
  * add quiz capabilities using both flashcard and worksheet interfaces
  * track scoring, permanently, following the model of keybr.com
* design a flashcard mode to drill on any type of problem, or even theory and terminology (this now becomes direct overlap with Quotes app and central to CurriculumFor.Life)
  * focus on mastery of ten times tables - the foundation of all decimal-based integer math, essential for all people
    * also drill on the decimal system itself, another fundamental essential
  * consider using some kid-friendly imagery, like Pokemon, to add interest to the math. Possibly give them an option, using for example Starwars API (SWAPI) and then some kind of nature imagery API
  * add precision for division setting 
  * make a component for stacked division notation
  * add option to allow range of digits for each value, or strictly one magnitude of digits
  * User can select between new BLANK worksheet and new FILLED worksheet
    * will need a separate "Save Worksheet" function in that case which reads DOM input values and operators (as I enable more complex/varied operations)
  * for state management, probably best UX if every change to worksheet is saved immediately to LS, which save/load from DB are user actions

## UI
* use range sliders for number of digits and precision inputs
* user will be able to set number of problems they want, each one is a draggable target, they can drag and drop into, and rearrange within each math problem. Each problem is saved, and can be edited without access control, EXCEPT it will have a lock icon button that will lock it from being edited
* num of problems is a property of generating new sheet, as are digits for each value fiekd; these should be set and confirmed. num of columns is a view property and can be changed on the fly, regardless of how many problems are in current worksheet
* make the sidenav wider to accomodate labels, and enable it to collapse to icons

## Features
* rather than "generate random values" make it a random problem, ie. randomize operation also
* rather than only hiding answers, have an option to randomly blank any field, thus making it an exercise in rearranging equations
* give it a timer, to allow for timed tests as well as time tracking overall work and engagement
* allow user to create math patterns; sequences of numbers that progress by ~n integers. Eg. the numbers 1-10 inclusive, or skip-count by 2's, 3's, etc.

## Production
* will need to look at printing and saving to .pdf. Will need to work on styling for standard A4 paper size

## bugfix
* 2022-03-27 lost ability to manually calculate problems. Can change inputs and save, but not results. Need to tie the calculation to current input value, not data-value attribute
* 'worksheets' in ls not saving correctly; getting partial overwrites of existing sheets
* 2022-03-29 deployed app bug not producing worksheet - operations shown but no problems: VM455:1 Uncaught (in promise) SyntaxError: Unexpected identifier
    at newRandomValues (DigitsSettings.svelte_svelte_type_style_lang-1a05efec.js:1:1996)
    at generateNewWorksheet (DigitsSettings.svelte_svelte_type_style_lang-1a05efec.js:1:2428)