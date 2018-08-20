from random import randint
import sys
import json 
import pymongo
import ast
from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017')
db = client['test']

currentHackathon = sys.argv[1]
currentHacker = json.loads(sys.argv[2])
#print('printing from python!!', currentHacker)
#print(currentHackathon)
allHackers = []
'''
currentHacker = db['users'].find_one({'urlId': 'jenny.xu'})
hackathon = db['hackathons'].find_one({'urlId': 'hackmohave.community.college'})
for email in hackathon['hackers']:
    temp = db['users'].find_one({'email':email})
    allHackers.append(temp)

#print(currentHackathon)
for email in currentHackathon['hackers']:
    temp = db['users'].find_one({'email':email})
    allHackers.append(temp)
'''

startIndex = 0
for index, char in enumerate(currentHackathon):
    if char == ',':
        email = currentHackathon[startIndex:index]
        startIndex = index+1
        temp = db['users'].find_one({'email':email})
        allHackers.append(temp)

#print(len(allHackers))

def calculateInterestScore(hacker, carescore):
    interestsArr = hacker['preferences']['interests']
    if len(interestsArr) == 0:
        return []
    if interestsArr[0] == None or len(interestsArr[0]) == 0 or interestsArr[0][0] == '' or interestsArr[0][1] == '':
        return []

    newInterestArr = []
    scoresum = 0;
    for interest in interestsArr:
        scoresum = scoresum + float(interest[1])

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(float(interest[1])*multipler*caremultipler,2))
        newInterestArr.append(score)

    return newInterestArr


def calculateLanguageScore(hacker, carescore):
    languagesArr = hacker['preferences']['languages']
    if len(languagesArr) == 0:
        return []
    if languagesArr[0] == None or len(languagesArr[0]) == 0 or languagesArr[0][0] == '' or languagesArr[0][1] == '':
        return []

    newLanguagesArr = []

    scoresum = 0;
    for language in languagesArr:
        scoresum = scoresum + float(language[1])

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for language in languagesArr:
        score = []
        score.append(language[0])
        score.append(round(float(language[1]) * multipler * caremultipler, 2))
        newLanguagesArr.append(score)

    return newLanguagesArr


def calculateTechScore(hacker, carescore):
    interestsArr = hacker['preferences']['technologies']
    if len(interestsArr) == 0:
        return []
    if interestsArr[0] == None or len(interestsArr[0]) == 0 or interestsArr[0][0] == '' or interestsArr[0][1] == '':
        return []
    newInterestArr = []
    scoresum = 0
    for interest in interestsArr:
        scoresum = scoresum + float(interest[1])

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(float(interest[1])*multipler*caremultipler,2))
        newInterestArr.append(score)

    return newInterestArr


def calculateFieldScore(hacker, carescore):
    interestsArr = hacker['preferences']['fields']
    if len(interestsArr) == 0:
        return []
    if interestsArr[0] == None or len(interestsArr[0]) == 0 or interestsArr[0][0] == '' or interestsArr[0][1] == '':
        return []

    newInterestArr = []
    scoresum = 0;
    for interest in interestsArr:
        scoresum = scoresum + float(interest[1])

    multipler = 0
    caremultipler = 0
    if scoresum != 0:
        multipler = float(100) / scoresum

    if carescore != 0:
        caremultipler = carescore / float(10)

    for interest in interestsArr:
        score = []
        score.append(interest[0])
        score.append(round(float(interest[1])*multipler*caremultipler,2))
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
    return common


def hackathonsimiliarscore(currentHacker, allHackers, carescores):
    resetuser(currentHacker, carescores['interests'], carescores['languages'], carescores['technologies'], carescores['fields'])
    hackathonsimiliarscores = []
    for c,hacker in enumerate(allHackers):
        if hacker != None:
            resetuser(hacker, carescores['interests'], carescores['languages'], carescores['technologies'], carescores['fields'])
            score = calculateSimiliarScore(currentHacker, hacker, carescores['interests'], carescores['languages'], carescores['technologies'], carescores['fields'])
            if score != 0:
                hackathonsimiliarscores.append([hacker['urlId'], score])
        

    #print(hackathonsimiliarscores)
    hackathonsimiliarscores.sort(key=lambda x: x[1],reverse=True)
    return hackathonsimiliarscores



#filters = {'major': [],'graduationYear': ['2018', '2019', '2020', '2021', '2022'],'educationLevel': ['undergraduate', 'graduate'],'school':False}
#similiarscores = hackathonsimiliarscore(allHackers[0], allHackers, allHackers[0]['careScores'])

#default value for carescores
if 'careScores' not in currentHacker:
    temp = json.loads('{"interests" : 10, "technologies" : 10, "languages" : 10,"fields" : 10}')
    similiarscores = hackathonsimiliarscore(currentHacker, allHackers, temp)
    print(similiarscores)
else:
    if currentHacker['careScores']['interests'] == None:
        currentHacker['careScores']['interests'] = 1
    if currentHacker['careScores']['languages'] == None:
        currentHacker['careScores']['languages'] = 1
    if currentHacker['careScores']['technologies'] == None:
        currentHacker['careScores']['technologies'] = 1
    if currentHacker['careScores']['fields'] == None:
        currentHacker['careScores']['fields'] = 1
    #print(currentHacker['careScores'])
    similiarscores = hackathonsimiliarscore(currentHacker, allHackers, currentHacker['careScores'])
    json.dumps(similiarscores)
    print(similiarscores)
