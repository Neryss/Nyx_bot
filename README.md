# Nyx_bot

## General things
Hey! This is basicaly a discord bot I made for a private server.
It pings a minecraft server and update its status depending on the current server status.
Can tell user to shut it down if the user tells someone the beautiful french "tg".
Also it joins at random intervals a voice channel and yell a bit. That's fun and customizable.
Some other Minecraft utils and that's all really.

## Monster Hunter World
So the currently "big part" of this project is the addition of a MHW database. You can use it by typing `/search <monster_name>`* in a channel which will return an embed with informations concerning the asked monster. The DB is fetched from the [MHW-db api](https://docs.mhw-db.com/), which returns all the data in a JSON format that you can find in [monster_db.json](./monster_db.json).

*Currently doesn't return any error if a monster isn't present in the DB (read down below) or if you mispell something. Example : odogaron instead of Odogaron is ok. Pukei pukei instead of Pukei-Pukei isn't (because of the dashes).

Only issue being it doesn't contain any informations about the Iceborne monsters, so I'm currently adding everything I can in the [iceborne_db.json](./iceborne_db.json) file.
If someone interested in this project wants to help, feel free to do so! The Iceborne dataset is simple to use (json format), and only work needed is to add Iceborne monsters info in the present array.

As said above ; all the data except Iceborne come from the [MHW-db api](https://docs.mhw-db.com/), and every data belongs to Capcom.

---

I might do a separate repo from this one concerning the DB only but we'll see in the future.
