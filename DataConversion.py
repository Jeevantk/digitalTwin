import pandas as pd
import matplotlib.pyplot as plt
import sys
if(len(sys.argv)!=2):
	print "Usage DataConversion.py filename"
	sys.exit()
File=open(sys.argv[1],"r")
lines=File.readlines()
required_data=lines[26:len(lines)-2]
stringData=""
for i in required_data:
    stringData=stringData+i

stringData=stringData.replace('\n','')
numbers = [float(n) for n in stringData.split()]
subsample=numbers[:2000]
# plt.plot(subsample)
# plt.show()
format_pandas=pd.DataFrame()
format_pandas['readings']=numbers
format_pandas.to_csv(sys.argv[1][:-3]+'csv',index=False)
