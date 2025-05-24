server = http.server


server.route("feed.json") = fetchJsonFromDatabase


def fetchJsonFromDatabase():
    connection = mysql.login(brugernavn, adgangskode)
    if connection.isSuccessful:
        feeds = connection.lookup("feed")¨
        if connection.lookup.isSuccessful:
            return json(feeds)
        else:
            return json("lookup failed")
    else:
        return json("connection to db failed")