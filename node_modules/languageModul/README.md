# Oblig2_Making-tools-for-your-project.-

The repository should have a readme.md file that demonstrates how to use your module. 

This is a basic modual that gives you the opertunity to change the language from English to Norwegian, and back.

The index.html file holds all the elements and their text that is changeble.

The module2.mjs holds an array that linkes to all the elements in the .html file.
If you want to add more elements, then you have to add a link to them in this array.
document.getElementById("....")
Then in the Dictionary.mjs you have to add the id of that new element that you made in booth objects ("no", "en") with the coresponding text in the different languages.

The changeButtons(dict) function takes a dictionary parameter that defines what dictionary it will loop throug
to change the coresponding text.
