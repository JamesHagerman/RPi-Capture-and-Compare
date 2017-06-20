#!/usr/bin/python

import sched
import time
import os
import datetime

#import ftplib

# This just sets up the scheduler:
s = sched.scheduler(time.time, time.sleep)

def do_something(sc):
        print "Doing stuff..."
        ts = time.time()
        st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d_%H-%M-%S')

        filename = "capture-"+st+".jpg"

        os.system("raspistill -q 10 --timeout 1000 -o ~/capture/files/"+filename)

	# Store latest as last:
	os.system("ln -fs `readlink ~/capture/files/latest.jpg` ~/capture/files/last.jpg")

	# Store latest as a link:
	os.system("ln -fs ~/capture/files/"+filename+" ~/capture/files/latest.jpg")

        # Uploading sucks. pi is SLOW

        # SCP:
        #os.system("scp ~/capture/files/"+filename+" normaluser@192.168.1.228:~/capture/")

        # FTP:
#       session = ftplib.FTP('192.168.1.228','normaluser','noneyet')
#       file = open("files/"+filename)
#       session.cwd("~/capture")
#       session.storbinary("STOR " + filename, file)
#       file.close()
#       session.quit()

        # Make sure we run it again!
        sc.enter(1, 1, do_something, (sc,))

#def upload(sc):
#       print "Uploading..."
#       os.system("scp ~/capture/files/* normaluser@192.168.1.228:~/capture/")


# Enter in a new scheduled job.
# The function takes the scheduler as a paramater...
s.enter(1, 1, do_something, (s,))

# Actaully start the thing running:
s.run()


