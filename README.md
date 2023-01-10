# Quiz Angel

A game developed by Tom Jolin.  Played it in the browser [here](https://www.crazygames.com/game/quiz-angel).

## Notes

In order to force the game to be played in landscape, you need to do the following.  For Android:

1. Open android/app/src/main/AndroidManifest.xml.
2. On the activity tag add `android:screenOrientation="landscape"`.

For iOS:

1. Open the info.plist, and find Supported interface orientation and Supported interface orientation (iPad).
2. Remove the portrait settings.
