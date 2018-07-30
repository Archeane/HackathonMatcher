from random import randint
import sys
import json 
import pymongo
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['test']

currentHackathon = json.loads(sys.argv[1])
currentHacker = json.loads(sys.argv[2])


allHackers = []
'''
hackathon = db['hackathons'].find_one({'email': 'ome@zalhebu.tn'})
for email in hackathon['hackers']:
    temp = db['users'].find_one({'email':email})
    allHackers.append(temp)
'''
for email in currentHackathon['hackers']:
    temp = db['users'].find_one({'email':email})
    allHackers.append(temp)


def calculateInterestScore(hacker, carescore):
    interestsArr = hacker['preferences']['interests']
    if len(interestsArr) == 0:
        return []
    newInterestArr = []
    scoresum = 0;
    for interest in interestsArr:
        scoresum = scoresum + interest[1]

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(interest[1]*multipler*caremultipler,2))
        newInterestArr.append(score)

    return newInterestArr


def calculateLanguageScore(hacker, carescore):
    languagesArr = hacker['preferences']['languages']
    if len(languagesArr) == 0:
        return []

    newLanguagesArr = []

    scoresum = 0;
    for language in languagesArr:
        scoresum = scoresum + language[1]

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for language in languagesArr:
        score = []
        score.append(language[0])
        score.append(round(language[1] * multipler * caremultipler, 2))
        newLanguagesArr.append(score)

    return newLanguagesArr


def calculateTechScore(hacker, carescore):
    interestsArr = hacker['preferences']['technologies']
    if len(interestsArr) == 0:
        return []
    newInterestArr = []
    scoresum = 0;
    for interest in interestsArr:
        scoresum = scoresum + interest[1]

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(interest[1]*multipler*caremultipler,2))
        newInterestArr.append(score)

    return newInterestArr


def calculateFieldScore(hacker, carescore):
    interestsArr = hacker['preferences']['fields']
    if len(interestsArr) == 0:
        return []
    newInterestArr = []
    scoresum = 0;
    for interest in interestsArr:
        scoresum = scoresum + interest[1]

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(interest[1]*multipler*caremultipler,2))
        newInterestArr.append(score)

    return newInterestArr



# TODO: not good practice to modify the parameter
def resetuser(hacker, interestcarescore, languagecarescore, techscore, fieldscore):
    newInterestArr = calculateInterestScore(hacker, interestcarescore)
    newLanguageArr = calculateLanguageScore(hacker, languagecarescore)
    newTechArr = calculateTechScore(hacker, techscore)
    newFieldsArr = calculateFieldScore(hacker, fieldscore)
    newInterestArr.sort()
    newLanguageArr.sort()
    newTechArr.sort()
    newFieldsArr.sort()
    hacker['preferences']['interests'] = newInterestArr
    hacker['preferences']['languages'] = newLanguageArr
    hacker['preferences']['technologies'] = newTechArr
    hacker['preferences']['fields'] = newFieldsArr


# TODO: @param filter: can be expanded to an array, along with carescores for each filter
def calculateSimiliarScore(currentHacker, compareHacker, interestsCare, languageCare, techCare, fieldCare):
    intsimiliar = 0
    langsimiliar = 0
    techsimiliar = 0
    fieldsimiliar = 0

    thisinterest = currentHacker['preferences']['interests']
    otherinterest = compareHacker['preferences']['interests']
    commonelements = findcommonelements(thisinterest, otherinterest)
    intsimiliar = commonelements[len(commonelements)-1] * interestsCare

    thislanguage = currentHacker['preferences']['languages']
    otherlanguage = compareHacker['preferences']['languages']
    commonelements = findcommonelements(thislanguage, otherlanguage)
    langsimiliar = commonelements[len(commonelements)-1] * languageCare

    thistech = currentHacker['preferences']['technologies']
    othertech = compareHacker['preferences']['technologies']
    commonelements = findcommonelements(thistech, othertech)
    techsimiliar = commonelements[len(commonelements)-1] * techCare

    thisfields = currentHacker['preferences']['fields']
    otherfields = compareHacker['preferences']['fields']
    commonelements = findcommonelements(thisfields, otherfields)
    fieldsimiliar = commonelements[len(commonelements)-1] * fieldCare

    #print(intsimiliar+langsimiliar)
    return intsimiliar+langsimiliar+techsimiliar+fieldsimiliar


def findcommonelements(arr1, arr2):
    i, j = 0, 0
    common = []
    interestsum = 0;
    while i < len(arr1) and j < len(arr2):
        if arr1[i][0] == arr2[j][0]:
            common.append(arr1[i][0])
            score = ((abs(100-(arr1[i][1]-arr2[j][1])))*float(arr1[i][1]))/float(100)
            interestsum = interestsum +score
            common.append(score)
            i += 1
            j += 1
        elif arr1[i][0] < arr2[j][0]:
            i += 1
        else:
            j += 1
    common.append(interestsum)
    #print(common)
    return common


def hackathonsimiliarscore(currentHacker, allHackers, carescores):
    hackathonsimiliarscores = []
    for hacker in allHackers:
        if hacker != None:
            resetuser(hacker, carescores['interests'], carescores['languages'], carescores['technologies'], carescores['fields'])
            score = calculateSimiliarScore(currentHacker, hacker, carescores['interests'], carescores['languages'], carescores['technologies'], carescores['fields'])
            if score != 0:
                hackathonsimiliarscores.append([hacker['email'], score])

    print(hackathonsimiliarscores)
    hackathonsimiliarscores.sort(key=lambda x: x[1],reverse=True)
    return hackathonsimiliarscores


#filters = {'major': [],'graduationYear': ['2018', '2019', '2020', '2021', '2022'],'educationLevel': ['undergraduate', 'graduate'],'school':False}
#similiarscores = hackathonsimiliarscore(allHackers[0], allHackers, allHackers[0]['careScores'])

similiarscores = hackathonsimiliarscore(currentHacker, allHackers, currentHacker['careScores'])
json.dumps(similiarscores)

#print(similiarscores)