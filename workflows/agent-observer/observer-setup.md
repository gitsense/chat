# Observer setup prompt

Copy this block into the current Group lead only when the user asks to add an
Observer.

~~~md
Create one managed Pi session named Agent Observer only if the current Group
does not already contain an Observer. Use the configured default model and a
dedicated workspace. Add it to the current Group in the Observers section and
verify the membership and placement from the complete Group document.

Read the current Persona records and the installed state-signals manifest.
Assign the Observer a stable Agent Observer Persona with the initial
state-neutral avatar using:

gsc pi sessions personas set <observer-session-id> --group-id <group-id> ...

Preserve all unrelated Persona fields and use the command's expected revision
when available. If the write conflicts, reread and retry the intended field
change a small bounded number of times.

Read the newest Group roster and send it to the Observer with a concise
onboarding message. The Observer is a regular Group member, not the lead. At
this stage it may acknowledge the roster and report that it is ready, but it
must not start a loop, change Buddy Personas, interpret Buddy state, send
notifications, or claim to monitor activity. Report the Observer ID, placement,
Persona, and roster timestamp to the human.

Stop here. The Observer role will be defined in a later workflow.
~~~

