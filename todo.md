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
  * eventually, longterm: worksheets and collections (curriculums/courses) can be made public; they can be viewed by author or searched/filtered; authors can be followed and favorited; view of public sheets/collections offers default view of all-time best-rated, new sheets/authors, as well as hot (average ratings over recent period)
  * implement a product tour for new users to show them the features and how to use the app

## UI
* use range sliders for number of digits and precision inputs
* user will be able to set number of problems they want, each one is a draggable target, they can drag and drop into, and rearrange within each math problem. Each problem is saved, and can be edited without access control, EXCEPT it will have a lock icon button that will lock it from being edited
* num of problems is a property of generating new sheet, as are digits for each value field; these should be set and confirmed. num of columns is a view property and can be changed on the fly, regardless of how many problems are in current worksheet
* make the sidenav wider to accomodate labels, and enable it to collapse to icons
* add a question mark symbol to operations menu to denote mixed operations, and to trigger random operations on click
* give user layout options - fit problems to page, or stack them with adjustable margins; allow problems to overflow to additional pages; column gap/margin
* allow user to set/change operations on individual problems in worksheet
* Provide icons for two main views: page-width and full-width
* need modals - use for login/auth, use for confirm delete, possibly also for settings
* when dragging a bracket into place, if eg. left bracket is dragged directly in front of an operation, it will automatically insert a new value field between bracket and operation
* give user the option to "update current worksheet OR save as new worksheet" (which generates and assigns a new XID)
* consider a fancy animated landing page that morphs a background gradient image between giant 'X + - %' symbols.
* PROBLEMS LAYOUT: consider checking all first inputs for length, and assigning longest length to all; etc for second input and result, for consistent columns
* add a dark/light mode

## Features
* rather than "generate random values" make it a random problem, ie. randomize operation also
* rather than only hiding answers, have an option to randomly blank any field, thus making it an exercise in rearranging equations
* give it a timer, to allow for timed tests as well as time tracking overall work and engagement
* allow user to create math patterns; sequences of numbers that progress by ~n integers. Eg. the numbers 1-10 inclusive, or skip-count by 2's, 3's, etc.
* devise a useful difficulty rating for problems and for worksheets overall (avg of problems). Give a weight of difficulty to each operation, multiplied by digits per value, by number of values, and compounded by brackets and mixed operations
* user can add custom problems using keyboard with maximum efficiency - they can select a default operator, or enter the operator symbol as they go; set the number of values for each problem and tabbing from final value begins new problem on a new line; or allow indefinite fields and mark a problem as ready. This would be the easiest way to implement brackets as well. BLANK SHEET: one good way to provide this feature is the option to create a blank worksheet to specs; and then as described, the user can enter values, results are auto-calculated, and tab moves from one problem to the next
* Option to provide only whole-number answers for division
* make sure user can change any operation of any problem freely
* ensure user can set decimal precision per-sheet or per-problem; remove decimal for integer results; and present fractional results as fractions, reduced.
* create a "curriculum" of various types of worksheets at levels of difficulty; provide an option (for paid users) to generate x # of pages of a given type with random values, and optionally to print those immediately
* for printing, provide option to "also print answers sheet" yes/no
* app can present complex problems (BEDMAS/PEMDAS) solved line-by-line

## Production
* will need to look at printing and saving to .pdf. Will need to work on styling for standard A4 paper size

## bugfix
* 2022-03-27 lost ability to manually calculate problems. Can change inputs and save, but not results. Need to tie the calculation to current input value, not data-value attribute
* 'worksheets' in ls not saving correctly; getting partial overwrites of existing sheets
* 2022-03-29 deployed app bug not producing worksheet - operations shown but no problems: VM455:1 Uncaught (in promise) SyntaxError: Unexpected identifier
    at newProblemWithRandomValues (DigitsSettings.svelte_svelte_type_style_lang-1a05efec.js:1:1996)
    at generateNewWorksheet (DigitsSettings.svelte_svelte_type_style_lang-1a05efec.js:1:2428)
* on # of problems change, update worksheet.problems, adding new or deleting problems - OR eliminate this by UI design, only render whole worksheets, no adjusting # of problems on an existing sheet unless it is a direct per-problem action (like a delete icon on a problem)
* updating individual problem not resizing result properly again
* "worksheet saved"/"not saved" indication not accurate - loaded sheets indicate not saved
* QUESTION is there a way to display a notification in UI when there is a client error (ie. console log)?
* when changing column and # problems, changes are not always reflected without page reload
* after logout, "savged worksheets" needs refresh

## logic & data
* STORES should be single source of truth. DOM and LS should reflect stores immediately & reactively; calculations should occur entirely with store values; DB should be updated or called on user action only (or eventually, auto-save features possibly)
* making the # of problems input step="2" only solves for 2-column layout. This is bad. Instead, the worksheet layout should accomodate as many problems as there are without breaking. Don't try to render nonexistent problems, and if you do, make a failsafe.
* UPSERT: the worksheets collection is getting updated incorrectly; I need to check if a worksheet exists by ID and then upsert if it does, and only push new entry to array if ID is not found
* allow user to either "update worksheet" or "save as new worksheet" (upsert or add to db)
* when a new worksheet is saved to DB, it needs to be reflected immediately in UI - currently in SideNav, using worksheets store, it is not
* looks like I should add a 'settings' object to localStorage, allowing more flexibility to work with settings in cases of reload, before DOM & stores are available
  
  ## Auth
  * signing in a new email with magic link creates a user. If that user wants to use the same email/account in future to log in with password, they must first be logged in and then conduct an "update password" operation as per https://supabase.com/docs/reference/javascript/auth-update
  * when user wants to change password, I need to capture the token returned in the header and redirect to a form for this purpose
  * put all auth options on one modal page, offer user option to "remember my preference" and put that in localStorage, changing the subsequent display as a result