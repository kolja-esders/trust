import spacy
#from spacy.en import English

#nlp = English(entity=True)
#John Smith loves coding in Python! Mein Name ist Thomas und ich bin 22 Jahre alt.
import re
import json
import argparse
 

def read_file(text):
     s=['Syria','Jordan','Turkey','Pakistan','Lebanon','Iran','Ethiopia','Kenya','Uganda','Democratic Republic of Congo','Chad','Afghanistan','Lake Chad Basin','South Sudan','Somalia','Ghana','India'] 
     #text='Mein Name ist Thomas Paul und ich bin 22 Jahre alt Kolkata is where I live.'
     #file3=open(text,'r') 
     #lines=file3.readlines()  
     lines=text
     lines=str(lines)
     nlp = spacy.load('en')
     sent = nlp(lines)
     age=''
     h=''

###Hobbies
     hobbies=['learning','learn','drawing','draw','cooking','cook','reading','read','gardening','hike','hiking','dance','dancing','play','playing','football','cricket','camping','shopping','shop','photography']
     for i in range(len(hobbies)):        
        if hobbies[i].lower() in lines.lower():
           if hobbies[i]=='football':
                  h=hobbies[i]+' '+'playing' 
           else:
                  h=h+','+hobbies[i]
## Age of the person
     for c in range(len(lines)):
        if lines[c].isdigit() and lines[c+1].isdigit():
           age=lines[c]+lines[c+1]  
           break
## Name of the person     
     flag=0
     
     name=''

     for token in sent:
        if flag==0:
           if token.ent_type_ == 'PERSON':
            if 'I'!=str(token):
              name=str(token)
              flag=flag+1
        else:
              break
      
#Extract the location
     place=''
     data=''
     for i in range(len(s)):
         if s[i] in lines:
            place=s[i]
                 
            break        
     print(json.dumps({'name': name,'age': age,'place': place,'hobbies': h}))
          


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("jsonfile", help=".json file containing the input text", nargs='?')
    args = parser.parse_args()
    read_file(args.jsonfile)   

if __name__ == '__main__':
    main()


