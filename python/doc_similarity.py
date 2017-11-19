import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_selection import SelectPercentile, f_classif
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.random_projection import sparse_random_matrix
from sklearn import preprocessing
from sklearn.metrics.pairwise import cosine_similarity
import scipy
from scipy import spatial
import json

import argparse

##check how good the german skills
def read_file(text):
      doc1='Ganz gut aber viel zu kalt Ich mag es aber vielleicht etwas zu viel Regen Ich finde es furchtbar ich bin die ganze Zeit am frieren die sonne scheint es ist sonnig es ist sehr warm und heiss es ist sehr wolkig und wolken ziehen auf es donnert und gibt ein gewitter der schnee scheint vom blauem himmel der hagel hagelt vom himmel der blaue himmel ist besonders toll'

      dataset = [doc1,str(text)]
      vectorizer = TfidfVectorizer(use_idf=False)
      X = vectorizer.fit_transform(dataset)
      lsa = TruncatedSVD(n_components=2)
      X = lsa.fit_transform(X)
      X = preprocessing.Normalizer(copy=False).fit_transform(X)
      acc=(1 - spatial.distance.cosine(X[0],X[1]))
      if acc>=0.8:
         print(json.dumps({"Level":"C1", "acc":acc}))
      elif acc>0.5 and acc<0.8:
         print(json.dumps({"Level":"B2", "acc":acc}))  
      elif acc>0.3 and acc<0.5:
         print(json.dumps({"Level":"B1", "acc":acc})) 
      elif acc>0.3 and acc<0.2:
         print(json.dumps({"Level":"A2", "acc":acc}))  
      else:
         print(json.dumps({"Level":"A1", "acc":acc}))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("jsonfile", help=".json file containing the input text", nargs='?')
    args = parser.parse_args()
    read_file(args.jsonfile)   

if __name__ == '__main__':
    main()

