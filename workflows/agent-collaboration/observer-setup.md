# Optional Observer setup prompt

Copy this block into the current Group lead only when the user asks to add an
Observer.

````md
Create one managed Pi session named Agent Observer only if the current Group
does not already contain an Observer. Use the configured default model and a
dedicated workspace. Apply the user's placement choice: use the normal rows
layout by default, or create/use a fixed `Observers` column only when the user
explicitly requested a fixed/dedicated column. If the available Group update
capabilities cannot express the requested placement, report that limitation and
wait; do not replace the Group document with a partial structure. Verify the
membership and placement from the complete Group document.

Read the current Persona records and the installed state-signals manifest.
Assign the Observer a stable Agent Observer Persona with the initial
`state-neutral` avatar and additive tags using a complete command such as:

~~~bash
gsc pi sessions personas set <observer-session-id> \
  --group-id <group-id> \
  --title "Agent Observer" \
  --description "Coordinates visibility across connected agents" \
  --avatar-id state-neutral \
  --add-tag role:observer \
  --add-tag scope:group \
  --expected-updated-at <updated-at-from-show>
~~~

Use the exact avatar ID from the installed state-signals manifest. Preserve all
unrelated Persona fields and use the command's expected revision when
available. If the write conflicts, reread and retry the intended field change a
small bounded number of times.

Read the newest Group roster and send it to the Observer with a concise
onboarding message. Include connected Pi sessions and external Buddies, and
identify the Observer's own session so it can exclude itself from any later
design. The Observer is a regular Group member, not the lead. At this stage it
may acknowledge the roster and report that it is ready, but it must not start a
loop, change Buddy Personas, interpret Buddy state, send notifications, or claim
to monitor activity. Report the Observer ID, placement, Persona, and roster
timestamp to the human.

Stop here. The Observer role will be defined in a later workflow.
````
