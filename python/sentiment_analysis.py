##Required software : python2.7+ 
import re
import json
import argparse
import os

def read_file(text): 
     negative=open(os.path.dirname(__file__) + '/negatives.txt','r')
     negative_vector=negative.readlines()
     positive=open(os.path.dirname(__file__) + '/positives.txt','r')
     positive_vector=positive.readlines()
     lines=text
     lines=str(lines)
     positive_count=0    
     negative_count=0
     for i in range(len(positive_vector)):     
         if positive_vector[i].rstrip().lower() in lines.lower():                        
             positive_count=positive_count+1
             
     for j in range(len(negative_vector)):         
         if negative_vector[j].lower().rstrip().lower() in lines.lower():       
            negative_count=negative_count+1 
     if positive_count==negative_count:      
            print(json.dumps({'sentiment':"Neutral"}))
     elif positive_count>negative_count:   
            print(json.dumps({'sentiment':"Positive"}))
     else:       
            print(json.dumps({'sentiment':"Negative"}))
        
def main():    
    parser = argparse.ArgumentParser()
    parser.add_argument("jsonfile", help=".json file containing the input text", nargs='?')
    args = parser.parse_args()
    read_file(args.jsonfile)

if __name__ == '__main__':
    main()
