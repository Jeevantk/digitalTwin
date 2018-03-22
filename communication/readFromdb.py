import sqlite3
import numpy

conn = sqlite3.connect('digitalTwin.db')
cursor = conn.cursor()

cursor.execute('SELECT * from tempurature')

alist = cursor.fetchall()

DatabaseElements=[]

for i in alist:
    k =str(i[1])
    DatabaseElements.append(float(k[:-2]))

## The list Database Elements will store all the data that is stored in the database