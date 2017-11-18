import spacy
from geotext import GeoText
#from spacy.en import English

#nlp = English(entity=True)
#John Smith loves coding in Python! Mein Name ist Thomas und ich bin 22 Jahre alt.
import re
import json
import argparse
 

def read_file(text):
     s=['Syria','Jordan','Turkey','Pakistan','Lebanon','Iran','Ethiopia','Kenya','Uganda','Democratic Republic of Congo','Chad','Afghanistan','Lake Chad Basin','South Sudan','Somalia','Ghana'] 
     #text='Mein Name ist Thomas Paul und ich bin 22 Jahre alt Kolkata is where I live.'
     file3=open(text,'r') 
     lines=file3.readlines()  
     lines=str(lines)
     nlp = spacy.load('xx')
     sent = nlp(lines)
     age=''
     
## Age of the person
     for c in range(len(lines)) :
        if lines[c].isdigit() and lines[c+1].isdigit():
           age=lines[c]+lines[c+1]  
           break
## Name of the person     
     flag=0
     
     name=''
     for token in sent:
        if flag==0:
           if token.ent_type_ == 'PER':
              name=str(token)
              flag=flag+1
        elif flag==1:
           if token.ent_type_ == 'PER':
              name=name+' '+str(token)
              break
        else:
              break
      
#Extract the location
     place=''
     data=''
     for i in range(len(s)):
         print(s[i])
         if s[i] in lines:
            print(s[i])
            place=s[i]
            break        
     data= {'name': name,'age': age,'place': place}
     with open('./data.json', 'w') as outfile:
          json.dump(data,outfile)
          


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("jsonfile", help=".json file containing the input text", nargs='?')
    args = parser.parse_args()
    read_file(args.jsonfile)   

if __name__ == '__main__':
    main()


