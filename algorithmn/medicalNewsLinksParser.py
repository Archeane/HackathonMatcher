from html.parser import HTMLParser
from bs4 import BeautifulSoup

import requests


f = open("newslinks.txt", "a")


links = []
class MyHTMLParser(HTMLParser):

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            links.append(attrs)
            #print("Encountered a start tag:", attrs)
            '''
    def handle_endtag(self, tag):
       


    def handle_data(self, data):
       '''



parser = MyHTMLParser()

htmlstr = """<table class="wikitable sortable jquery-tablesorter">

<thead><tr>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Name</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Specialty</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Publisher</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">English</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Publication Dates
</th></tr></thead><tbody>
<tr>
<td><i><a href="/wiki/Academic_Medicine_(journal)" title="Academic Medicine (journal)">Academic Medicine</a></i></td>
<td>Academic medicine</td>
<td><a href="/wiki/Association_of_American_Medical_Colleges" title="Association of American Medical Colleges">Association of American Medical Colleges</a></td>
<td>English</td>
<td>1926-present
</td></tr>
<tr>
<td><i><a href="/wiki/ACIMED" class="mw-redirect" title="ACIMED">ACIMED</a></i></td>
<td>Medical informatics</td>
<td><a href="/w/index.php?title=National_Center_of_Information_on_Medical_Sciences_in_Cuba&amp;action=edit&amp;redlink=1" class="new" title="National Center of Information on Medical Sciences in Cuba (page does not exist)">National Center of Information on Medical Sciences in Cuba</a></td>
<td>Spanish</td>
<td>1993–present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Anaesthesiologica_Scandinavica" title="Acta Anaesthesiologica Scandinavica">Acta Anaesthesiologica Scandinavica</a></i></td>
<td><a href="/wiki/Anaesthesiology" class="mw-redirect" title="Anaesthesiology">Anaesthesiology</a>, <a href="/wiki/Intensive_Care" class="mw-redirect" title="Intensive Care">Intensive Care</a></td>
<td><a href="/w/index.php?title=Scandinavian_Society_of_Anaesthesiology_and_Intensive_Care_Medicine&amp;action=edit&amp;redlink=1" class="new" title="Scandinavian Society of Anaesthesiology and Intensive Care Medicine (page does not exist)">Scandinavian Society of Anaesthesiology and Intensive Care Medicine</a></td>
<td>English</td>
<td>1957-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_M%C3%A9dica_Portuguesa" title="Acta Médica Portuguesa">Acta Médica Portuguesa</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Portuguese_Medical_Association&amp;action=edit&amp;redlink=1" class="new" title="Portuguese Medical Association (page does not exist)">Portuguese Medical Association</a></td>
<td>Portuguese</td>
<td>1979-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Neurologica_Scandinavica" title="Acta Neurologica Scandinavica">Acta Neurologica Scandinavica</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1925-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Orthopaedica_et_Traumatologica_Turcica" title="Acta Orthopaedica et Traumatologica Turcica">Acta Orthopaedica et Traumatologica Turcica</a></i></td>
<td>Orthopedics</td>
<td><a href="/w/index.php?title=Turkish_Association_of_Orthopaedics_and_Traumatology&amp;action=edit&amp;redlink=1" class="new" title="Turkish Association of Orthopaedics and Traumatology (page does not exist)">Turkish Association of Orthopaedics and Traumatology</a></td>
<td>English</td>
<td>1962-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Oto-Laryngologica" title="Acta Oto-Laryngologica">Acta Oto-Laryngologica</a></i></td>
<td>Otolaryngology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1918-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Paediatrica" title="Acta Paediatrica">Acta Paediatrica</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1921-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Psychiatrica_Scandinavica" title="Acta Psychiatrica Scandinavica">Acta Psychiatrica Scandinavica</a></i></td>
<td>Psychiatry</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1926-present
</td></tr>
<tr>
<td><i><a href="/wiki/Acta_Radiologica" title="Acta Radiologica">Acta Radiologica</a></i></td>
<td>Radiology</td>
<td><a href="/wiki/Sage_Publications" class="mw-redirect" title="Sage Publications">Sage Publications</a></td>
<td>English</td>
<td>1921-present
</td></tr>
<tr>
<td><i><a href="/wiki/Advances_in_Therapy" title="Advances in Therapy">Advances in Therapy</a></i></td>
<td>Clinical medicine</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1984-present
</td></tr>
<tr>
<td><i><a href="/wiki/African_Journal_of_Paediatric_Surgery" title="African Journal of Paediatric Surgery">African Journal of Paediatric Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/AIDS_(journal)" title="AIDS (journal)">AIDS</a></i></td>
<td>AIDS</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1987–present
</td></tr>
<tr>
<td><i><a href="/wiki/Alimentary_Pharmacology_%26_Therapeutics" title="Alimentary Pharmacology &amp; Therapeutics">Alimentary Pharmacology &amp; Therapeutics</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1987-present
</td></tr>
<tr>
<td><i><a href="/wiki/Alzheimer_Disease_and_Associated_Disorders" title="Alzheimer Disease and Associated Disorders">Alzheimer Disease and Associated Disorders</a></i></td>
<td>Alzheimer's</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1987-present
</td></tr>
<tr>
<td><i><a href="/wiki/Alzheimer%27s_Research_%26_Therapy" title="Alzheimer's Research &amp; Therapy">Alzheimer's Research &amp; Therapy</a></i></td>
<td>Alzheimer's</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>2009-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Family_Physician" title="American Family Physician">American Family Physician</a></i></td>
<td>Family medicine</td>
<td><a href="/wiki/American_Academy_of_Family_Physicians" title="American Academy of Family Physicians">American Academy of Family Physicians</a></td>
<td>English</td>
<td>1969-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Alzheimer%27s_Disease_%26_Other_Dementias" title="American Journal of Alzheimer's Disease &amp; Other Dementias">American Journal of Alzheimer's Disease &amp; Other Dementias</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Emergency_Medicine" title="American Journal of Emergency Medicine">American Journal of Emergency Medicine</a></i></td>
<td>Emergency medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1983-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Gastroenterology" class="mw-redirect" title="American Journal of Gastroenterology">American Journal of Gastroenterology</a></i></td>
<td>Gastroenterology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1934-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Medical_Genetics" title="American Journal of Medical Genetics">American Journal of Medical Genetics</a></i></td>
<td>Genetics</td>
<td><a href="/wiki/Wiley-Liss" class="mw-redirect" title="Wiley-Liss">Wiley-Liss</a></td>
<td>English</td>
<td>1977-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_the_Medical_Sciences" class="mw-redirect" title="American Journal of the Medical Sciences">American Journal of the Medical Sciences</a></i></td>
<td>Medicine</td>
<td>Lippincott Williams &amp; Wilkins</td>
<td>English</td>
<td>1820-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Obstetrics_and_Gynecology" title="American Journal of Obstetrics and Gynecology">American Journal of Obstetrics and Gynecology</a></i></td>
<td>Obstetrics and Gynecology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1920-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Public_Health" title="American Journal of Public Health">American Journal of Public Health</a></i></td>
<td>Public Health</td>
<td><a href="/wiki/American_Public_Health_Association" title="American Public Health Association">American Public Health Association</a></td>
<td>English</td>
<td>1911-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Roentgenology" title="American Journal of Roentgenology">American Journal of Roentgenology</a></i></td>
<td>Radiology</td>
<td><a href="/wiki/American_Roentgen_Ray_Society" title="American Roentgen Ray Society">American Roentgen Ray Society</a></td>
<td>English</td>
<td>1908-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_American_Journal_of_Surgical_Pathology" title="The American Journal of Surgical Pathology">The American Journal of Surgical Pathology</a></i></td>
<td>Surgery, Pathology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1977-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Translational_Research" title="American Journal of Translational Research">American Journal of Translational Research</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/E-Century_Publishing_Corporation" title="E-Century Publishing Corporation">e-Century Publishing Corporation</a></td>
<td>English</td>
<td>2009-present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Transplantation" title="American Journal of Transplantation">American Journal of Transplantation</a></i></td>
<td>Transplantation</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>2001–present
</td></tr>
<tr>
<td><i><a href="/wiki/American_Journal_of_Tropical_Medicine_and_Hygiene" class="mw-redirect" title="American Journal of Tropical Medicine and Hygiene">American Journal of Tropical Medicine and Hygiene</a></i></td>
<td>Tropical medicine</td>
<td><a href="/wiki/American_Society_of_Tropical_Medicine_and_Hygiene" title="American Society of Tropical Medicine and Hygiene">American Society of Tropical Medicine and Hygiene</a></td>
<td>English</td>
<td>1921-present
</td></tr>
<tr>
<td><i><a href="/wiki/Anaesthesia_(journal)" title="Anaesthesia (journal)">Anaesthesia</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1946-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Cardiac_Anaesthesia" title="Annals of Cardiac Anaesthesia">Annals of Cardiac Anaesthesia</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1998-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Emergency_Medicine" title="Annals of Emergency Medicine">Annals of Emergency Medicine</a></i></td>
<td>Emergency medicine</td>
<td><a href="/wiki/Mosby_(publisher)" class="mw-redirect" title="Mosby (publisher)">Mosby</a></td>
<td>English</td>
<td>1972-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Family_Medicine" title="Annals of Family Medicine">Annals of Family Medicine</a></i></td>
<td>Family medicine</td>
<td>Annals of Family Medicine, Inc.</td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Human_Biology" title="Annals of Human Biology">Annals of Human Biology</a></i></td>
<td>Population biology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1974-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Human_Genetics" title="Annals of Human Genetics">Annals of Human Genetics</a></i></td>
<td>Human genetics</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>1925-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Internal_Medicine" title="Annals of Internal Medicine">Annals of Internal Medicine</a></i></td>
<td>Internal medicine</td>
<td><a href="/wiki/American_College_of_Physicians" title="American College of Physicians">American College of Physicians</a></td>
<td>English</td>
<td>1927-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Medicine" title="Annals of Medicine">Annals of Medicine</a></i></td>
<td>Internal medicine</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1969-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Pediatric_Cardiology" title="Annals of Pediatric Cardiology">Annals of Pediatric Cardiology</a></i></td>
<td>Pediatrics, Cardiology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Annals_of_Pharmacotherapy" class="mw-redirect" title="The Annals of Pharmacotherapy">The Annals of Pharmacotherapy</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1967-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Physical_and_Rehabilitation_Medicine" title="Annals of Physical and Rehabilitation Medicine">Annals of Physical and Rehabilitation Medicine</a></i></td>
<td>Rehabilitation</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_The_Royal_College_of_Surgeons_of_England" title="Annals of The Royal College of Surgeons of England">Annals of The Royal College of Surgeons of England</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/The_Royal_College_of_Surgeons_of_England" class="mw-redirect" title="The Royal College of Surgeons of England">The Royal College of Surgeons of England</a></td>
<td>English</td>
<td>1947-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annals_of_Surgery" title="Annals of Surgery">Annals of Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1885-present
</td></tr>
<tr>
<td><i><a href="/wiki/Annual_Review_of_Medicine" class="mw-redirect" title="Annual Review of Medicine">Annual Review of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Annual_Reviews_(publisher)" title="Annual Reviews (publisher)">Annual Reviews</a></td>
<td>English</td>
<td>1950-present
</td></tr>
<tr>
<td><i><a href="/wiki/Archives_of_Disease_in_Childhood" title="Archives of Disease in Childhood">Archives of Disease in Childhood</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/BMJ_Group" class="mw-redirect" title="BMJ Group">BMJ Group</a></td>
<td>English</td>
<td>1926-present
</td></tr>
<tr>
<td><i><a href="/wiki/Archives_of_Osteoporosis" title="Archives of Osteoporosis">Archives of Osteoporosis</a></i></td>
<td>Bone Health</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>2006-present
</td></tr>
<tr>
<td><i><a href="/wiki/Arteriosclerosis,_Thrombosis,_and_Vascular_Biology" title="Arteriosclerosis, Thrombosis, and Vascular Biology">Arteriosclerosis, Thrombosis, and Vascular Biology</a></i></td>
<td>Vascular biology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1981-present
</td></tr>
<tr>
<td><i><a href="/wiki/Asian_Cardiovascular_and_Thoracic_Annals" title="Asian Cardiovascular and Thoracic Annals">Asian Cardiovascular and Thoracic Annals</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1998–present
</td></tr>
<tr>
<td><i><a href="/wiki/Aviation,_Space,_and_Environmental_Medicine" title="Aviation, Space, and Environmental Medicine">Aviation, Space, and Environmental Medicine</a></i></td>
<td>Aviation medicine</td>
<td><a href="/wiki/Aerospace_Medical_Association" title="Aerospace Medical Association">Aerospace Medical Association</a></td>
<td>English</td>
<td>1930-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Dental_Journal" title="British Dental Journal">British Dental Journal</a></i></td>
<td>Dentistry</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1904-present
</td></tr>
<tr>
<td><i><a href="/wiki/Biological_Research_For_Nursing" class="mw-redirect" title="Biological Research For Nursing">Biological Research For Nursing</a></i></td>
<td>Nursing</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/Biology_of_the_Neonate" class="mw-redirect" title="Biology of the Neonate">Biology of the Neonate</a></i></td>
<td>Neonatology</td>
<td><a href="/w/index.php?title=Karger_Publications&amp;action=edit&amp;redlink=1" class="new" title="Karger Publications (page does not exist)">Karger Publications</a></td>
<td>English</td>
<td>1959-present
</td></tr>
<tr>
<td><i><a href="/wiki/Biomedical_Imaging_and_Intervention_Journal" title="Biomedical Imaging and Intervention Journal">Biomedical Imaging and Intervention Journal</a></i></td>
<td>Radiology</td>
<td><a href="/wiki/University_of_Malaysia" class="mw-redirect" title="University of Malaysia">University of Malaysia</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/BJUI" class="mw-redirect" title="BJUI">BJUI</a></i></td>
<td>Urology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1929–present
</td></tr>
<tr>
<td><i><a href="/wiki/Blood_(journal)" title="Blood (journal)">Blood</a></i></td>
<td>Hematology</td>
<td><a href="/wiki/American_Society_of_Hematology" title="American Society of Hematology">American Society of Hematology</a></td>
<td>English</td>
<td>1946–present
</td></tr>
<tr>
<td><i><a href="/wiki/Bone_Marrow_Transplantation_(journal)" title="Bone Marrow Transplantation (journal)">Bone Marrow Transplantation</a></i></td>
<td>Transplantation</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/BMC_Cancer" title="BMC Cancer">BMC Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/BMC_Medicine" title="BMC Medicine">BMC Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/BMJ" class="mw-redirect" title="BMJ">BMJ</a></i></td>
<td>Medicine</td>
<td>BMJ</td>
<td>English</td>
<td>1840-present
</td></tr>
<tr>
<td><i><a href="/wiki/Brain_(journal)" title="Brain (journal)">Brain</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1878-present
</td></tr>
<tr>
<td><i><a href="/wiki/Brazilian_Journal_of_Medical_and_Biological_Research" title="Brazilian Journal of Medical and Biological Research">Brazilian Journal of Medical and Biological Research</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Associa%C3%A7%C3%A3o_Brasileira_de_Divulga%C3%A7%C3%A3o_Cient%C3%ADfica&amp;action=edit&amp;redlink=1" class="new" title="Associação Brasileira de Divulgação Científica (page does not exist)">Associação Brasileira de Divulgação Científica</a></td>
<td>English</td>
<td>1968-present
</td></tr>
<tr>
<td><i><a href="/wiki/Breast_Cancer_Research_and_Treatment" title="Breast Cancer Research and Treatment">Breast Cancer Research and Treatment</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Springer_Netherlands" class="mw-redirect" title="Springer Netherlands">Springer Netherlands</a></td>
<td>English</td>
<td>1981-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Columbia_Medical_Journal" title="British Columbia Medical Journal">British Columbia Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/British_Columbia_Medical_Association" class="mw-redirect" title="British Columbia Medical Association">British Columbia Medical Association</a></td>
<td>English</td>
<td>1924-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Anaesthesia" title="British Journal of Anaesthesia">British Journal of Anaesthesia</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1923-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Cancer" title="British Journal of Cancer">British Journal of Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1947-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Dermatology" title="British Journal of Dermatology">British Journal of Dermatology</a></i></td>
<td>Dermatology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1888-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Diabetes_and_Vascular_Disease" title="British Journal of Diabetes and Vascular Disease">British Journal of Diabetes and Vascular Disease</a></i></td>
<td>Diabetes</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Medical_Practitioners" title="British Journal of Medical Practitioners">British Journal of Medical Practitioners</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=JMN_Medical_Education&amp;action=edit&amp;redlink=1" class="new" title="JMN Medical Education (page does not exist)">JMN Medical Education</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Ophthalmology" title="British Journal of Ophthalmology">British Journal of Ophthalmology</a></i></td>
<td>Ophthalmology</td>
<td><a href="/wiki/BMJ_Publishing_Group" class="mw-redirect" title="BMJ Publishing Group">BMJ Publishing Group</a></td>
<td>English</td>
<td>1917-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Sexual_Medicine" title="British Journal of Sexual Medicine">British Journal of Sexual Medicine</a></i></td>
<td>Sexual Health</td>
<td><a href="/wiki/Hayward_Medical_Communications" title="Hayward Medical Communications">Hayward Medical Communications</a></td>
<td>English</td>
<td>1973-present
</td></tr>
<tr>
<td><i><a href="/wiki/British_Journal_of_Surgery" title="British Journal of Surgery">British Journal of Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>1913-present
</td></tr>
<tr>
<td><i><a href="/wiki/Bulletin_of_the_World_Health_Organization" title="Bulletin of the World Health Organization">Bulletin of the World Health Organization</a></i></td>
<td>Global Health</td>
<td><a href="/wiki/World_Health_Organization" title="World Health Organization">World Health Organization</a></td>
<td>English</td>
<td>1947-present
</td></tr>
<tr>
<td><i><a href="/wiki/CA_%E2%80%93_A_Cancer_Journal_for_Clinicians" class="mw-redirect" title="CA – A Cancer Journal for Clinicians">CA – A Cancer Journal for Clinicians</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1950-present
</td></tr>
<tr>
<td><i><a href="/wiki/Calcified_Tissue_International" title="Calcified Tissue International">Calcified Tissue International</a></i></td>
<td>Bone Health</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1967-present
</td></tr>
<tr>
<td><i><a href="/wiki/Calicut_Medical_Journal" title="Calicut Medical Journal">Calicut Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Calicut_Medical_College" class="mw-redirect" title="Calicut Medical College">Calicut Medical College</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Canadian_Journal_of_Gastroenterology_%26_Hepatology" class="mw-redirect" title="Canadian Journal of Gastroenterology &amp; Hepatology">Canadian Journal of Gastroenterology &amp; Hepatology</a></i></td>
<td>Gastroenterology, Hepatology</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English</td>
<td>1987-present
</td></tr>
<tr>
<td><i><a href="/wiki/Canadian_Journal_of_Infectious_Diseases_%26_Medical_Microbiology" class="mw-redirect" title="Canadian Journal of Infectious Diseases &amp; Medical Microbiology">Canadian Journal of Infectious Diseases &amp; Medical Microbiology</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English</td>
<td>1990-present
</td></tr>
<tr>
<td><i><a href="/wiki/Canadian_Medical_Association_Journal" title="Canadian Medical Association Journal">Canadian Medical Association Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Canadian_Medical_Association" title="Canadian Medical Association">Canadian Medical Association</a></td>
<td>English, French</td>
<td>1911-present
</td></tr>
<tr>
<td><i><a href="/wiki/Canadian_Respiratory_Journal" title="Canadian Respiratory Journal">Canadian Respiratory Journal</a></i></td>
<td>Respiratory Health</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English, French</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Cancer_Medicine" title="Cancer Medicine">Cancer Medicine</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>2012-present
</td></tr>
<tr>
<td><i><a href="/wiki/Cardiology_(journal)" title="Cardiology (journal)">Cardiology</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Karger" class="mw-redirect" title="Karger">Karger</a></td>
<td>English</td>
<td>1937-present
</td></tr>
<tr>
<td><i><a href="/wiki/Cardiovascular_Diabetology" title="Cardiovascular Diabetology">Cardiovascular Diabetology</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/Cephalalgia_(journal)" title="Cephalalgia (journal)">Cephalalgia</a></i></td>
<td>Headache</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1981-present
</td></tr>
<tr>
<td><i><a href="/wiki/Chest_(journal)" title="Chest (journal)">Chest</a></i></td>
<td>Cardiology, Respiratory Health</td>
<td><a href="/wiki/American_College_of_Chest_Physicians" title="American College of Chest Physicians">American College of Chest Physicians</a></td>
<td>English</td>
<td>1935-present
</td></tr>
<tr>
<td><i><a href="/wiki/Child:_Care,_Health_and_Development" title="Child: Care, Health and Development">Child: Care, Health and Development</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1975-present
</td></tr>
<tr>
<td><i><a href="/wiki/Chinese_Medical_Journal" title="Chinese Medical Journal">Chinese Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Chinese_Medical_Association" class="mw-redirect" title="Chinese Medical Association">Chinese Medical Association</a>, <a href="/w/index.php?title=Wolters_Kluwer_Medknow&amp;action=edit&amp;redlink=1" class="new" title="Wolters Kluwer Medknow (page does not exist)">Wolters Kluwer Medknow</a></td>
<td>English</td>
<td>1887-present
</td></tr>
<tr>
<td><i><a href="/wiki/Chronic_Illness_(journal)" title="Chronic Illness (journal)">Chronic Illness</a></i></td>
<td>Chronic Illness</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Circulation_(journal)" title="Circulation (journal)">Circulation</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1950-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Cleft_Palate-Craniofacial_Journal" title="The Cleft Palate-Craniofacial Journal">The Cleft Palate-Craniofacial Journal</a></i></td>
<td>Craniofacial Medicine</td>
<td><a href="/wiki/Allen_Press" title="Allen Press">Allen Press</a></td>
<td>English</td>
<td>1964-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Anatomy" title="Clinical Anatomy">Clinical Anatomy</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Wiley-Liss" class="mw-redirect" title="Wiley-Liss">Wiley-Liss</a></td>
<td>English</td>
<td>1988-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_and_Experimental_Gastroenterology" title="Clinical and Experimental Gastroenterology">Clinical and Experimental Gastroenterology</a></i></td>
<td>Gastroenterology</td>
<td><a href="/wiki/Dove_Medical_Press" title="Dove Medical Press">Dove Medical Press</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_and_Translational_Science" title="Clinical and Translational Science">Clinical and Translational Science</a></i>
</td>
<td>Medicine
</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a>
</td>
<td>English
</td>
<td>2008-Present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Breast_Cancer" title="Clinical Breast Cancer">Clinical Breast Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2000-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Case_Studies" title="Clinical Case Studies">Clinical Case Studies</a></i></td>
<td>Clinical medicine</td>
<td><a href="/wiki/Sage_Publications" class="mw-redirect" title="Sage Publications">Sage Publications</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Chemistry_(journal)" title="Clinical Chemistry (journal)">Clinical Chemistry</a></i></td>
<td>Medicinal Chemistry</td>
<td><a href="/wiki/American_Association_for_Clinical_Chemistry" title="American Association for Clinical Chemistry">American Association for Clinical Chemistry</a></td>
<td>English</td>
<td>1955-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Colorectal_Cancer" title="Clinical Colorectal Cancer">Clinical Colorectal Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Gastroenterology_and_Hepatology" title="Clinical Gastroenterology and Hepatology">Clinical Gastroenterology and Hepatology</a></i></td>
<td>Gastroenterology, Hepatology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Genitourinary_Cancer" title="Clinical Genitourinary Cancer">Clinical Genitourinary Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Clinical_Journal_of_Pain" title="The Clinical Journal of Pain">The Clinical Journal of Pain</a></i></td>
<td>Pain Management</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1985-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Leukemia" title="Clinical Leukemia">Clinical Leukemia</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/CIG_Media_Group" title="CIG Media Group">CIG Media Group</a></td>
<td>English</td>
<td>2006-2009
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Lung_Cancer" title="Clinical Lung Cancer">Clinical Lung Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Lymphoma,_Myeloma_%26_Leukemia" title="Clinical Lymphoma, Myeloma &amp; Leukemia">Clinical Lymphoma, Myeloma &amp; Leukemia</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2000-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Medicine:_Oncology" class="mw-redirect" title="Clinical Medicine: Oncology">Clinical Medicine: Oncology</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Libertas_Academica" title="Libertas Academica">Libertas Academica</a></td>
<td>English</td>
<td>2007-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Microbiology_Reviews" title="Clinical Microbiology Reviews">Clinical Microbiology Reviews</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/American_Society_for_Microbiology" title="American Society for Microbiology">American Society for Microbiology</a></td>
<td>English</td>
<td>1988-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Ovarian_Cancer" class="mw-redirect" title="Clinical Ovarian Cancer">Clinical Ovarian Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Pharmacology:_Advances_and_Applications" title="Clinical Pharmacology: Advances and Applications">Clinical Pharmacology: Advances and Applications</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Dove_Medical_Press" title="Dove Medical Press">Dove Medical Press</a></td>
<td>English</td>
<td>2010-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Pharmacology_%26_Therapeutics" title="Clinical Pharmacology &amp; Therapeutics">Clinical Pharmacology &amp; Therapeutics</a></i>
</td>
<td>Pharmacology
</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a>
</td>
<td>English
</td>
<td>1960-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Science_(journal)" title="Clinical Science (journal)">Clinical Science</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Portland_Press" title="Portland Press">Portland Press</a></td>
<td>English</td>
<td>1909-present
</td></tr>
<tr>
<td><i><a href="/wiki/Clinical_Toxicology" title="Clinical Toxicology">Clinical Toxicology</a></i></td>
<td>Toxicology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1968-present
</td></tr>
<tr>
<td><i><a href="/wiki/Comprehensive_Therapy" title="Comprehensive Therapy">Comprehensive Therapy</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Humana_Press" title="Humana Press">Humana Press</a></td>
<td>English</td>
<td>1975-2010
</td></tr>
<tr>
<td><i><a href="/wiki/Contemporary_Clinical_Trials" title="Contemporary Clinical Trials">Contemporary Clinical Trials</a></i></td>
<td>Research Design</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1980-present
</td></tr>
<tr>
<td><i><a href="/wiki/COPD:_Journal_of_Chronic_Obstructive_Pulmonary_Disease" title="COPD: Journal of Chronic Obstructive Pulmonary Disease">COPD: Journal of Chronic Obstructive Pulmonary Disease</a></i></td>
<td>Respiratory Health</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Critical_Care_Medicine" class="mw-redirect" title="Critical Care Medicine">Critical Care Medicine</a></i></td>
<td>Emergency Medicine</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1973-present
</td></tr>
<tr>
<td><i><a href="/wiki/Critical_Reviews_in_Microbiology" title="Critical Reviews in Microbiology">Critical Reviews in Microbiology</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1971-present
</td></tr>
<tr>
<td><i><a href="/wiki/Critical_Reviews_in_Oncogenesis" title="Critical Reviews in Oncogenesis">Critical Reviews in Oncogenesis</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Critical_Reviews_in_Toxicology" title="Critical Reviews in Toxicology">Critical Reviews in Toxicology</a></i></td>
<td>Toxicology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1971-present
</td></tr>
<tr>
<td><i><a href="/wiki/Current_Gene_Therapy" title="Current Gene Therapy">Current Gene Therapy</a></i></td>
<td>Gene Therapy</td>
<td><a href="/wiki/Bentham_Science_Publishers" title="Bentham Science Publishers">Bentham Science Publishers</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Current_Medical_Research_and_Opinion" title="Current Medical Research and Opinion">Current Medical Research and Opinion</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1972-present
</td></tr>
<tr>
<td><i><a href="/wiki/Current_Pain_and_Headache_Reports" title="Current Pain and Headache Reports">Current Pain and Headache Reports</a></i></td>
<td>Headache</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Cutaneous_and_Ocular_Toxicology" title="Cutaneous and Ocular Toxicology">Cutaneous and Ocular Toxicology</a></i></td>
<td>Toxicology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/DARU_(journal)" class="mw-redirect" title="DARU (journal)">DARU Journal of Pharmaceutical Sciences</a></i></td>
<td>Pharmacy</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>1990-present
</td></tr>
<tr>
<td><i><a href="/wiki/Deutsche_Medizinische_Wochenschrift" title="Deutsche Medizinische Wochenschrift">Deutsche Medizinische Wochenschrift</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Thieme_Medical_Publishers" title="Thieme Medical Publishers">Thieme Medical Publishers</a></td>
<td>German</td>
<td>1875-present
</td></tr>
<tr>
<td><i><a href="/wiki/Developmental_Neurorehabilitation" title="Developmental Neurorehabilitation">Developmental Neurorehabilitation</a></i></td>
<td>Neurology, Pediatrics</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1997-present
</td></tr>
<tr>
<td><i><a href="/wiki/Diabetes_(journal)" title="Diabetes (journal)">Diabetes</a></i></td>
<td>Diabetes</td>
<td><a href="/wiki/American_Diabetes_Association" title="American Diabetes Association">American Diabetes Association</a></td>
<td>English</td>
<td>1952-present
</td></tr>
<tr>
<td><i><a href="/wiki/Diabetes_and_Vascular_Disease_Research" title="Diabetes and Vascular Disease Research">Diabetes and Vascular Disease Research</a></i></td>
<td>Diabetes</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Diabetes_Care" title="Diabetes Care">Diabetes Care</a></i></td>
<td>Diabetes</td>
<td><a href="/wiki/American_Diabetes_Association" title="American Diabetes Association">American Diabetes Association</a></td>
<td>English</td>
<td>1978-present
</td></tr>
<tr>
<td><i><a href="/wiki/Diabetes,_Metabolic_Syndrome_and_Obesity:_Targets_and_Therapy" title="Diabetes, Metabolic Syndrome and Obesity: Targets and Therapy">Diabetes, Metabolic Syndrome and Obesity: Targets and Therapy</a></i></td>
<td>Diabetes</td>
<td><a href="/wiki/Dove_Medical_Press" title="Dove Medical Press">Dove Medical Press</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Drug_and_Alcohol_Dependence_(journal)" title="Drug and Alcohol Dependence (journal)">Drug and Alcohol Dependence</a></i></td>
<td>Addiction</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1975-present
</td></tr>
<tr>
<td><i><a href="/wiki/Emergency_Medicine_Journal" title="Emergency Medicine Journal">Emergency Medicine Journal</a></i></td>
<td>Emergency Medicine</td>
<td><a href="/wiki/BMJ_Group" class="mw-redirect" title="BMJ Group">BMJ Group</a></td>
<td>English</td>
<td>1983-present
</td></tr>
<tr>
<td><i><a href="/wiki/Endocrinology_(journal)" title="Endocrinology (journal)">Endocrinology</a></i></td>
<td>Endocrinology</td>
<td><a href="/wiki/The_Endocrine_Society" class="mw-redirect" title="The Endocrine Society">The Endocrine Society</a></td>
<td>English</td>
<td>1917-present
</td></tr>
<tr>
<td><i><a href="/wiki/Epilepsy_Currents" title="Epilepsy Currents">Epilepsy Currents</a></i></td>
<td>Epilepsy</td>
<td><a href="/wiki/Allen_Press" title="Allen Press">Allen Press</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Journal_of_Cancer_Prevention" title="European Journal of Cancer Prevention">European Journal of Cancer Prevention</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1991-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Journal_of_General_Practice" title="European Journal of General Practice">European Journal of General Practice</a></i></td>
<td>Family medicine</td>
<td><a href="/wiki/Taylor_%26_Francis" title="Taylor &amp; Francis">Taylor &amp; Francis</a></td>
<td>English</td>
<td>1995-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Journal_of_Medical_Research" title="European Journal of Medical Research">European Journal of Medical Research</a></i></td>
<td>Clinical research</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>1995-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Journal_of_Palliative_Care" title="European Journal of Palliative Care">European Journal of Palliative Care</a></i></td>
<td>Palliative Care</td>
<td><a href="/wiki/Hayward_Medical_Communications" title="Hayward Medical Communications">Hayward Medical Communications</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Journal_of_Physiotherapy" title="European Journal of Physiotherapy">European Journal of Physiotherapy</a></i></td>
<td>Physical Therapy</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Medical_Journal" title="European Medical Journal">European Medical Journal</a></i></td>
<td>Medicine</td>
<td>European Medical Journal</td>
<td>English</td>
<td>2012-present
</td></tr>
<tr>
<td><i><a href="/wiki/European_Radiology" title="European Radiology">European Radiology</a></i></td>
<td>Radiology</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1991-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Biological_Therapy" title="Expert Opinion on Biological Therapy">Expert Opinion on Biological Therapy</a></i></td>
<td>Therapeutics</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Drug_Delivery" title="Expert Opinion on Drug Delivery">Expert Opinion on Drug Delivery</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Drug_Discovery" title="Expert Opinion on Drug Discovery">Expert Opinion on Drug Discovery</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>2006-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Drug_Metabolism_%26_Toxicology" title="Expert Opinion on Drug Metabolism &amp; Toxicology">Expert Opinion on Drug Metabolism &amp; Toxicology</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Drug_Safety" title="Expert Opinion on Drug Safety">Expert Opinion on Drug Safety</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Emerging_Drugs" title="Expert Opinion on Emerging Drugs">Expert Opinion on Emerging Drugs</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1996-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Investigational_Drugs" title="Expert Opinion on Investigational Drugs">Expert Opinion on Investigational Drugs</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1992-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Medical_Diagnostics" title="Expert Opinion on Medical Diagnostics">Expert Opinion on Medical Diagnostics</a></i></td>
<td>Diagnostics</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>2007-2013
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Pharmacotherapy" title="Expert Opinion on Pharmacotherapy">Expert Opinion on Pharmacotherapy</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Therapeutic_Patents" title="Expert Opinion on Therapeutic Patents">Expert Opinion on Therapeutic Patents</a></i></td>
<td>Patents</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1991-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Opinion_on_Therapeutic_Targets" title="Expert Opinion on Therapeutic Targets">Expert Opinion on Therapeutic Targets</a></i></td>
<td>Drug design</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1997-present
</td></tr>
<tr>
<td><i><a href="/wiki/Expert_Review_of_Clinical_Pharmacology" title="Expert Review of Clinical Pharmacology">Expert Review of Clinical Pharmacology</a></i></td>
<td>Clinical pharmacology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Family_Practice_(journal)" title="Family Practice (journal)">Family Practice (journal)</a></i></td>
<td>Family medicine</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1984-present
</td></tr>
<tr>
<td><i><a href="/wiki/Future_Oncology" title="Future Oncology">Future Oncology</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Future_Medicine_Ltd" class="mw-redirect" title="Future Medicine Ltd">Future Medicine Ltd</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Gastroenterology_(journal)" title="Gastroenterology (journal)">Gastroenterology</a></i></td>
<td>Gastroenterology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1943-present
</td></tr>
<tr>
<td><i><a href="/wiki/Gynecologic_Oncology" class="mw-redirect" title="Gynecologic Oncology">Gynecologic Oncology</a></i></td>
<td>Oncology, Gynecology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1972-present
</td></tr>
<tr>
<td><i><a href="/wiki/Hand_Surgery_(journal)" title="Hand Surgery (journal)">Hand Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/World_Scientific" title="World Scientific">World Scientific</a></td>
<td>English</td>
<td>1996-present
</td></tr>
<tr>
<td><i><a href="/wiki/Harefuah" title="Harefuah">Harefuah</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Israel_Medical_Association" title="Israel Medical Association">Israel Medical Association</a></td>
<td>Hebrew</td>
<td>1920-present
</td></tr>
<tr>
<td><i><a href="/wiki/Heart_(journal)" title="Heart (journal)">Heart</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/BMJ_Group" class="mw-redirect" title="BMJ Group">BMJ Group</a></td>
<td>English</td>
<td>1939-present
</td></tr>
<tr>
<td><i><a href="/wiki/Hepatitis_Monthly" title="Hepatitis Monthly">Hepatitis Monthly</a></i></td>
<td>Hepatitis</td>
<td><a href="/wiki/Kowsar" title="Kowsar">Kowsar</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/Hormone_Research_(journal)" class="mw-redirect" title="Hormone Research (journal)">Hormone Research</a></i></td>
<td>Endocrinology</td>
<td><a href="/wiki/Karger_Publishers" title="Karger Publishers">Karger Publishers</a></td>
<td>English</td>
<td>1970-present
</td></tr>
<tr>
<td><i><a href="/wiki/Hospital_Practice" title="Hospital Practice">Hospital Practice</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>1966-present
</td></tr>
<tr>
<td><i><a href="/wiki/Human_Pathology" title="Human Pathology">Human Pathology</a></i></td>
<td>Pathology</td>
<td><a href="/wiki/Saunders" title="Saunders">Saunders</a></td>
<td>English</td>
<td>1970-present
</td></tr>
<tr>
<td><i><a href="/wiki/Human_Reproduction" class="mw-redirect" title="Human Reproduction">Human Reproduction</a></i></td>
<td>Reproductive medicine</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/Hypertension_(journal)" title="Hypertension (journal)">Hypertension</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/American_Heart_Association" title="American Heart Association">American Heart Association</a></td>
<td>English</td>
<td>1979-present
</td></tr>
<tr>
<td><i><a href="/wiki/Immunogenetics_(journal)" title="Immunogenetics (journal)">Immunogenetics</a></i></td>
<td>Immunology, Genetics</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1974-present
</td></tr>


<tr>
<td><i><a href="/wiki/Indian_Journal_of_Anaesthesia" title="Indian Journal of Anaesthesia">Indian Journal of Anaesthesia</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>2002-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Dermatology" title="Indian Journal of Dermatology">Indian Journal of Dermatology</a></i></td>
<td>Dermatology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1955-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Dermatology,_Venereology_and_Leprology" title="Indian Journal of Dermatology, Venereology and Leprology">Indian Journal of Dermatology, Venereology and Leprology</a></i></td>
<td>Dermatology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1990-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Gastroenterology" title="Indian Journal of Gastroenterology">Indian Journal of Gastroenterology</a></i></td>
<td>Gastroenterology</td>
<td><a href="/w/index.php?title=Indian_Society_of_Gastroenterology&amp;action=edit&amp;redlink=1" class="new" title="Indian Society of Gastroenterology (page does not exist)">Indian Society of Gastroenterology</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Medical_Microbiology" title="Indian Journal of Medical Microbiology">Indian Journal of Medical Microbiology</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1983-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Medical_Research" title="Indian Journal of Medical Research">Indian Journal of Medical Research</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1913-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Medical_Sciences" title="Indian Journal of Medical Sciences">Indian Journal of Medical Sciences</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1947-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Ophthalmology" title="Indian Journal of Ophthalmology">Indian Journal of Ophthalmology</a></i></td>
<td>Ophthalmology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1953-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Journal_of_Pharmacology" title="Indian Journal of Pharmacology">Indian Journal of Pharmacology</a></i></td>
<td>Pharmacology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1969-present
</td></tr>
<tr>
<td><i><a href="/wiki/Indian_Pacing_and_Electrophysiology_Journal" title="Indian Pacing and Electrophysiology Journal">Indian Pacing and Electrophysiology Journal</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Archives_of_Medicine" title="International Archives of Medicine">International Archives of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=IMed.pub&amp;action=edit&amp;redlink=1" class="new" title="IMed.pub (page does not exist)">iMed.pub</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Geriatric_Psychiatry" title="International Journal of Geriatric Psychiatry">International Journal of Geriatric Psychiatry</a></i></td>
<td>Geriatrics, Psychology</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Medical_Sciences" title="International Journal of Medical Sciences">International Journal of Medical Sciences</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Ivyspring_International_Publisher" title="Ivyspring International Publisher">Ivyspring International Publisher</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Obesity" title="International Journal of Obesity">International Journal of Obesity</a></i></td>
<td>Obesity</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1977-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Psychoanalysis" class="mw-redirect" title="International Journal of Psychoanalysis">International Journal of Psychoanalysis</a></i></td>
<td>Psychology</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1920-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Speech-Language_Pathology" title="International Journal of Speech-Language Pathology">International Journal of Speech-Language Pathology</a></i></td>
<td>Speech Pathology</td>
<td><a href="/wiki/Informa" title="Informa">Informa</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/International_Journal_of_Surgery" title="International Journal of Surgery">International Journal of Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Investigative_Ophthalmology_%26_Visual_Science" title="Investigative Ophthalmology &amp; Visual Science">Investigative Ophthalmology &amp; Visual Science</a></i></td>
<td>Ophthalmology</td>
<td><a href="/w/index.php?title=Cadmus_(publisher)&amp;action=edit&amp;redlink=1" class="new" title="Cadmus (publisher) (page does not exist)">Cadmus</a></td>
<td>English</td>
<td>1976-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Israel_Journal_of_Psychiatry_and_Related_Sciences" class="mw-redirect" title="The Israel Journal of Psychiatry and Related Sciences">The Israel Journal of Psychiatry and Related Sciences</a></i></td>
<td>Psychiatry</td>
<td><a href="/w/index.php?title=Israel_Science_Publishers&amp;action=edit&amp;redlink=1" class="new" title="Israel Science Publishers (page does not exist)">Israel Science Publishers</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Israel_Medical_Association_Journal" title="Israel Medical Association Journal">Israel Medical Association Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Israel_Medical_Association" title="Israel Medical Association">Israel Medical Association</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_(journal)" title="JAMA (journal)">JAMA: The Journal of the American Medical Association</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1883-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Dermatology" title="JAMA Dermatology">JAMA Dermatology</a></i></td>
<td>Dermatology</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1960-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Facial_Plastic_Surgery" title="JAMA Facial Plastic Surgery">JAMA Facial Plastic Surgery</a></i></td>
<td>Plastic Surgery</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Internal_Medicine" title="JAMA Internal Medicine">JAMA Internal Medicine</a></i></td>
<td>Internal Medicine</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1908-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Neurology" title="JAMA Neurology">JAMA Neurology</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1960-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Ophthalmology" title="JAMA Ophthalmology">JAMA Ophthalmology</a></i></td>
<td>Ophthalmology</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1929-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Otolaryngology%E2%80%93Head_%26_Neck_Surgery" title="JAMA Otolaryngology–Head &amp; Neck Surgery">JAMA Otolaryngology–Head &amp; Neck Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1925-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Pediatrics" title="JAMA Pediatrics">JAMA Pediatrics</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1911-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Psychiatry" title="JAMA Psychiatry">JAMA Psychiatry</a></i></td>
<td>Psychiatry</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1959-present
</td></tr>
<tr>
<td><i><a href="/wiki/JAMA_Surgery" title="JAMA Surgery">JAMA Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/American_Medical_Association" title="American Medical Association">American Medical Association</a></td>
<td>English</td>
<td>1920-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Johns_Hopkins_Medical_Journal" title="The Johns Hopkins Medical Journal">The Johns Hopkins Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Johns_Hopkins_Press" class="mw-redirect" title="Johns Hopkins Press">Johns Hopkins Press</a></td>
<td>English</td>
<td>1889-1982
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Acquired_Immune_Deficiency_Syndromes" title="Journal of Acquired Immune Deficiency Syndromes">Journal of Acquired Immune Deficiency Syndromes</a></i></td>
<td>HIV/AIDS</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1988-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_the_American_College_of_Cardiology" title="Journal of the American College of Cardiology">Journal of the American College of Cardiology</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1983-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_the_American_Geriatrics_Society" title="Journal of the American Geriatrics Society">Journal of the American Geriatrics Society</a></i></td>
<td>Geriatrics</td>
<td><a href="/wiki/Blackwell_Science" class="mw-redirect" title="Blackwell Science">Blackwell Science</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_the_American_Osteopathic_Association" class="mw-redirect" title="Journal of the American Osteopathic Association">Journal of the American Osteopathic Association</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/American_Osteopathic_Association" title="American Osteopathic Association">American Osteopathic Association</a></td>
<td>English</td>
<td>1901-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Ayurveda_and_Integrative_Medicine" title="Journal of Ayurveda and Integrative Medicine">Journal of Ayurveda and Integrative Medicine</a></i></td>
<td>Integrative Medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>2010-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Bone_and_Joint_Surgery" class="mw-redirect" title="Journal of Bone and Joint Surgery">Journal of Bone and Joint Surgery</a></i></td>
<td>Bone Health</td>
<td><a href="/w/index.php?title=The_Journal_of_Bone_and_Joint_Surgery,_Inc&amp;action=edit&amp;redlink=1" class="new" title="The Journal of Bone and Joint Surgery, Inc (page does not exist)">The Journal of Bone and Joint Surgery, Inc</a></td>
<td>English</td>
<td>1889-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Cachexia,_Sarcopenia_and_Muscle" title="Journal of Cachexia, Sarcopenia and Muscle">Journal of Cachexia, Sarcopenia and Muscle</a></i></td>
<td>Muscle Health</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>2010-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Cancer" title="Journal of Cancer">Journal of Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Ivyspring_International_Publisher" title="Ivyspring International Publisher">Ivyspring International Publisher</a></td>
<td>English</td>
<td>2010-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Cardiovascular_Translational_Research" title="Journal of Cardiovascular Translational Research">Journal of Cardiovascular Translational Research</a></i></td>
<td>Cardiology</td>
<td><a href="/w/index.php?title=International_Society_for_Cardiovascular_Translational_Research&amp;action=edit&amp;redlink=1" class="new" title="International Society for Cardiovascular Translational Research (page does not exist)">International Society for Cardiovascular Translational Research</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Clinical_Endocrinology_and_Metabolism" class="mw-redirect" title="Journal of Clinical Endocrinology and Metabolism">Journal of Clinical Endocrinology and Metabolism</a></i></td>
<td>Endocrinology</td>
<td><a href="/wiki/The_Endocrine_Society" class="mw-redirect" title="The Endocrine Society">The Endocrine Society</a></td>
<td>English</td>
<td>1941-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Clinical_Investigation" title="Journal of Clinical Investigation">Journal of Clinical Investigation</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/American_Society_for_Clinical_Investigation" title="American Society for Clinical Investigation">American Society for Clinical Investigation</a></td>
<td>English</td>
<td>1924-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Clinical_Oncology" title="Journal of Clinical Oncology">Journal of Clinical Oncology</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/American_Society_of_Clinical_Oncology" title="American Society of Clinical Oncology">American Society of Clinical Oncology</a></td>
<td>English</td>
<td>1983-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Clinical_Psychopharmacology" title="Journal of Clinical Psychopharmacology">Journal of Clinical Psychopharmacology</a></i></td>
<td>Psychology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1981-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Clinical_Sleep_Medicine" title="Journal of Clinical Sleep Medicine">Journal of Clinical Sleep Medicine</a></i></td>
<td><a href="/wiki/Sleep_medicine" title="Sleep medicine">Sleep medicine</a></td>
<td><a href="/wiki/American_Academy_of_Sleep_Medicine" title="American Academy of Sleep Medicine">American Academy of Sleep Medicine</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Experimental_Medicine" title="Journal of Experimental Medicine">Journal of Experimental Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Rockefeller_University_Press" title="Rockefeller University Press">Rockefeller University Press</a></td>
<td>English</td>
<td>1896-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journals_of_Gerontology" class="mw-redirect" title="Journals of Gerontology">Journals of Gerontology</a></i></td>
<td>Aging</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1946-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Hypertension" title="Journal of Hypertension">Journal of Hypertension</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Immunology" title="Journal of Immunology">Journal of Immunology</a></i></td>
<td>Immunology</td>
<td><a href="/wiki/The_American_Association_of_Immunologists" class="mw-redirect" title="The American Association of Immunologists">The American Association of Immunologists</a></td>
<td>English</td>
<td>1915-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Infection_in_Developing_Countries" title="Journal of Infection in Developing Countries">Journal of Infection in Developing Countries</a></i></td>
<td>Infectious Disease</td>
<td>Journal of Infection in Developing Countries</td>
<td>English</td>
<td>2006-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Internal_Medicine" title="Journal of Internal Medicine">Journal of Internal Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Wiley-Blackwell" title="Wiley-Blackwell">Wiley-Blackwell</a></td>
<td>English</td>
<td>1863-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Investigative_Dermatology" title="Journal of Investigative Dermatology">Journal of Investigative Dermatology</a></i></td>
<td>Dermatology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1938-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Medical_Biography" title="Journal of Medical Biography">Journal of Medical Biography</a></i></td>
<td>Medical Personnel</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1993-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Medical_Case_Reports" title="Journal of Medical Case Reports">Journal of Medical Case Reports</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/BioMed_Central" title="BioMed Central">BioMed Central</a></td>
<td>English</td>
<td>2007-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Medical_Economics" title="Journal of Medical Economics">Journal of Medical Economics</a></i></td>
<td>Medicine, Pharmacology</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1998-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Medical_Genetics" title="Journal of Medical Genetics">Journal of Medical Genetics</a></i></td>
<td>Genetics</td>
<td><a href="/wiki/BMJ_Group" class="mw-redirect" title="BMJ Group">BMJ Group</a></td>
<td>English</td>
<td>1964-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Journal_of_Medical_Practice_Management" title="The Journal of Medical Practice Management">The Journal of Medical Practice Management</a></i></td>
<td>Health Management</td>
<td><a href="/wiki/Greenbranch_Publishing" title="Greenbranch Publishing">Greenbranch Publishing</a></td>
<td>English</td>
<td>1984-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Medicine" title="Journal of Medicine">Journal of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Karger_Publishers" title="Karger Publishers">Karger Publishers</a></td>
<td>English</td>
<td>1970-2004
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Nervous_and_Mental_Disease" class="mw-redirect" title="Journal of Nervous and Mental Disease">Journal of Nervous and Mental Disease</a></i></td>
<td>Psychiatry</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1874-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Occupational_and_Environmental_Medicine" title="Journal of Occupational and Environmental Medicine">Journal of Occupational and Environmental Medicine</a></i></td>
<td>Occupational Medicine</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1959-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Oncology_Practice" title="Journal of Oncology Practice">Journal of Oncology Practice</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/American_Society_of_Clinical_Oncology" title="American Society of Clinical Oncology">American Society of Clinical Oncology</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pain_Research" title="Journal of Pain Research">Journal of Pain Research</a></i></td>
<td>Pain</td>
<td><a href="/wiki/Dove_Medical_Press" title="Dove Medical Press">Dove Medical Press</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pakistan_Medical_Association" title="Journal of Pakistan Medical Association">Journal of Pakistan Medical Association</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Pakistan_Medical_Association&amp;action=edit&amp;redlink=1" class="new" title="Pakistan Medical Association (page does not exist)">Pakistan Medical Association</a></td>
<td>English</td>
<td>1951-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pediatric_Endocrinology_and_Metabolism" title="Journal of Pediatric Endocrinology and Metabolism">Journal of Pediatric Endocrinology and Metabolism</a></i></td>
<td>Endocrinology</td>
<td><a href="/wiki/Walter_de_Gruyter" title="Walter de Gruyter">Walter de Gruyter</a></td>
<td>English</td>
<td>1985-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pediatric_Gastroenterology_and_Nutrition" title="Journal of Pediatric Gastroenterology and Nutrition">Journal of Pediatric Gastroenterology and Nutrition</a></i></td>
<td>Gastroenterology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pediatric_Health_Care" title="Journal of Pediatric Health Care">Journal of Pediatric Health Care</a></i></td>
<td>Pediatrics</td>
<td>Elsevier</td>
<td>English</td>
<td>1987-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Pediatric_Orthopaedics_B" title="Journal of Pediatric Orthopaedics B">Journal of Pediatric Orthopaedics B</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1989-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Journal_of_Pediatrics" title="The Journal of Pediatrics">The Journal of Pediatrics</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1932-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Postgraduate_Medicine" title="Journal of Postgraduate Medicine">Journal of Postgraduate Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1955-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_the_Royal_College_of_Physicians_of_Edinburgh" title="Journal of the Royal College of Physicians of Edinburgh">Journal of the Royal College of Physicians of Edinburgh</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Royal_College_of_Physicians_of_Edinburgh" title="Royal College of Physicians of Edinburgh">Royal College of Physicians of Edinburgh</a></td>
<td>English</td>
<td>1971-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_the_Royal_Society_of_Medicine" title="Journal of the Royal Society of Medicine">Journal of the Royal Society of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1809-present
</td></tr>
<tr>
<td><i><a href="/wiki/Journal_of_Studies_on_Alcohol_and_Drugs" title="Journal of Studies on Alcohol and Drugs">Journal of Studies on Alcohol and Drugs</a></i></td>
<td>Addiction</td>
<td><a href="/w/index.php?title=Alcohol_Research_Documentation&amp;action=edit&amp;redlink=1" class="new" title="Alcohol Research Documentation (page does not exist)">Alcohol Research Documentation</a></td>
<td>English</td>
<td>1940-present
</td></tr>
<tr>
<td><i><a href="/wiki/Korean_Journal_of_Anesthesiology" title="Korean Journal of Anesthesiology">Korean Journal of Anesthesiology</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/w/index.php?title=Korean_Society_of_Anesthesiologists&amp;action=edit&amp;redlink=1" class="new" title="Korean Society of Anesthesiologists (page does not exist)">Korean Society of Anesthesiologists</a></td>
<td>English</td>
<td>1968-present
</td></tr>
<tr>
<td><i><a href="/wiki/L%C3%A4kartidningen" title="Läkartidningen">Läkartidningen</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Swedish_Medical_Association&amp;action=edit&amp;redlink=1" class="new" title="Swedish Medical Association (page does not exist)">Swedish Medical Association</a></td>
<td>Swedish</td>
<td>1965-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Lancet" title="The Lancet">The Lancet</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1823-present
</td></tr>
<tr>
<td><i><a href="/wiki/Langenbeck%27s_Archives_of_Surgery" title="Langenbeck's Archives of Surgery">Langenbeck's Archives of Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/w/index.php?title=Spring_Science%2BBusiness_Media&amp;action=edit&amp;redlink=1" class="new" title="Spring Science+Business Media (page does not exist)">Spring Science+Business Media</a></td>
<td>English</td>
<td>1860-present
</td></tr>
<tr>
<td><i><a href="/wiki/Macedonian_Journal_of_Medical_Sciences" title="Macedonian Journal of Medical Sciences">Macedonian Journal of Medical Sciences</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Institute_of_Immunobiology_and_Human_Genetics&amp;action=edit&amp;redlink=1" class="new" title="Institute of Immunobiology and Human Genetics (page does not exist)">Institute of Immunobiology and Human Genetics</a></td>
<td>English</td>
<td>2008-present
</td></tr>
<tr>
<td><i><a href="/wiki/Mayo_Clinic_Proceedings" title="Mayo Clinic Proceedings">Mayo Clinic Proceedings</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1926-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Medical_Journal_of_Australia" title="The Medical Journal of Australia">The Medical Journal of Australia</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Australasian_Medical_Publishing_Company&amp;action=edit&amp;redlink=1" class="new" title="Australasian Medical Publishing Company (page does not exist)">Australasian Medical Publishing Company</a></td>
<td>English</td>
<td>1914-present
</td></tr>
<tr>
<td><i><a href="/wiki/Medical_Law_International" title="Medical Law International">Medical Law International</a></i></td>
<td>Medical Law, Bioethics</td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1993-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Medical_Letter_on_Drugs_and_Therapeutics" title="The Medical Letter on Drugs and Therapeutics">The Medical Letter on Drugs and Therapeutics</a></i></td>
<td>Pharmacology</td>
<td><a href="/w/index.php?title=The_Medical_letter,_Inc.&amp;action=edit&amp;redlink=1" class="new" title="The Medical letter, Inc. (page does not exist)">The Medical letter, Inc.</a></td>
<td>English</td>
<td>1959-present
</td></tr>
<tr>
<td><i><a href="/wiki/Medicine,_Conflict_and_Survival" title="Medicine, Conflict and Survival">Medicine, Conflict and Survival</a></i></td>
<td>Global Health</td>
<td><a href="/wiki/Taylor_and_Francis_Group" class="mw-redirect" title="Taylor and Francis Group">Taylor and Francis Group</a></td>
<td>English</td>
<td>1985-present
</td></tr>
<tr>
<td><i><a href="/wiki/Melanoma_Research" title="Melanoma Research">Melanoma Research</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Menopause_(journal)" title="Menopause (journal)">Menopause</a></i></td>
<td>Gynecology, Aging</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Mens_Sana_Monographs" title="Mens Sana Monographs">Mens Sana Monographs</a></i></td>
<td>Mental Health</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Middle_East_African_Journal_of_Ophthalmology" title="Middle East African Journal of Ophthalmology">Middle East African Journal of Ophthalmology</a></i></td>
<td>Ophthalmology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Molecular_Medicine_(journal)" title="Molecular Medicine (journal)">Molecular Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/The_Feinstein_Institute_for_Medical_Research" class="mw-redirect" title="The Feinstein Institute for Medical Research">The Feinstein Institute for Medical Research</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Mount_Sinai_Journal_of_Medicine" title="Mount Sinai Journal of Medicine">Mount Sinai Journal of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>1934-2012
</td></tr>
<tr>
<td><i><a href="/wiki/Movement_Disorders_(journal)" title="Movement Disorders (journal)">Movement Disorders</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Wiley-Liss" class="mw-redirect" title="Wiley-Liss">Wiley-Liss</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/Myanmar_Medical_Journal" title="Myanmar Medical Journal">Myanmar Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Myanmar_Medical_Association" title="Myanmar Medical Association">Myanmar Medical Association</a></td>
<td>English</td>
<td>1953-present
</td></tr>

<tr>
<td><i><a href="/wiki/The_National_Medical_Journal_of_India" title="The National Medical Journal of India">National Medical Journal of India</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=All_India_Institute_of_Medical_Sciences,_New_Delhi&amp;action=edit&amp;redlink=1" class="new" title="All India Institute of Medical Sciences, New Delhi (page does not exist)">All India Institute of Medical Sciences, New Delhi</a></td>
<td>English</td>
<td>1988-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Medicine" title="Nature Medicine">Nature Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1995-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Cancer" title="Nature Reviews Cancer">Nature Reviews Cancer</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Cardiology" title="Nature Reviews Cardiology">Nature Reviews Cardiology</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Clinical_Oncology" title="Nature Reviews Clinical Oncology">Nature Reviews Clinical Oncology</a></i></td>
<td>Oncology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Disease_Primers" title="Nature Reviews Disease Primers">Nature Reviews Disease Primers</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2015-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Gastroenterology_%26_Hepatology" title="Nature Reviews Gastroenterology &amp; Hepatology">Nature Reviews Gastroenterology &amp; Hepatology</a></i></td>
<td>Gastroenterology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Immunology" title="Nature Reviews Immunology">Nature Reviews Immunology</a></i></td>
<td>Immunology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Microbiology" title="Nature Reviews Microbiology">Nature Reviews Microbiology</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2003-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Nephrology" title="Nature Reviews Nephrology">Nature Reviews Nephrology</a></i></td>
<td>Nephrology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Neurology" title="Nature Reviews Neurology">Nature Reviews Neurology</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Neuroscience" title="Nature Reviews Neuroscience">Nature Reviews Neuroscience</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2000-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Rheumatology" title="Nature Reviews Rheumatology">Nature Reviews Rheumatology</a></i></td>
<td>Rheumatology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nature_Reviews_Urology" title="Nature Reviews Urology">Nature Reviews Urology</a></i></td>
<td>Urology</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nederlands_Tijdschrift_voor_Geneeskunde" title="Nederlands Tijdschrift voor Geneeskunde">Nederlands Tijdschrift voor Geneeskunde</a></i></td>
<td>Medicine</td>
<td><a href="/w/index.php?title=Vereniging_Nederlands_Tijdschrift_voor_Geneeskunde&amp;action=edit&amp;redlink=1" class="new" title="Vereniging Nederlands Tijdschrift voor Geneeskunde (page does not exist)">Vereniging Nederlands Tijdschrift voor Geneeskunde</a></td>
<td>Dutch</td>
<td>1857-present
</td></tr>
<tr>
<td><i><a href="/wiki/Neural_Regeneration_Research" title="Neural Regeneration Research">Neural Regeneration Research</a></i></td>
<td>Neurology</td>
<td><a href="/w/index.php?title=Publishing_House_of_Neural_Regeneration_Research&amp;action=edit&amp;redlink=1" class="new" title="Publishing House of Neural Regeneration Research (page does not exist)">Publishing House of Neural Regeneration Research</a></td>
<td>English</td>
<td>2006-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Neurologist" title="The Neurologist">The Neurologist</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1997-present
</td></tr>
<tr>
<td><i><a href="/wiki/Neurology_(journal)" title="Neurology (journal)">Neurology</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1951-present
</td></tr>
<tr>
<td><i><a href="/wiki/Neurology_India" title="Neurology India">Neurology India</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Medknow_Publications" title="Medknow Publications">Medknow Publications</a></td>
<td>English</td>
<td>1953-present
</td></tr>
<tr>
<td><i><a href="/wiki/Neuropsychiatric_Disease_and_Treatment" title="Neuropsychiatric Disease and Treatment">Neuropsychiatric Disease and Treatment</a></i></td>
<td>Neuropsychiatry</td>
<td>Dove Medical Press</td>
<td>English</td>
<td>2005-present
</td></tr>
<tr>
<td><i><a href="/wiki/Neuropsychiatry_(journal)" title="Neuropsychiatry (journal)">Neuropsychiatry</a></i></td>
<td>Neuropsychiatry</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English</td>
<td>2011-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_New_England_Journal_of_Medicine" title="The New England Journal of Medicine">The New England Journal of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Massachusetts_Medical_Society" title="Massachusetts Medical Society">Massachusetts Medical Society</a></td>
<td>English</td>
<td>1812-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_New_Zealand_Medical_Journal" title="The New Zealand Medical Journal">The New Zealand Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/New_Zealand_Medical_Association" title="New Zealand Medical Association">New Zealand Medical Association</a></td>
<td>English</td>
<td>1887-present
</td></tr>
<tr>
<td><i><a href="/wiki/Nursing_Children_and_Young_People" title="Nursing Children and Young People">Nursing Children and Young People</a></i></td>
<td>Pediatrics, Nursing</td>
<td><a href="/wiki/RCN_Publishing" class="mw-redirect" title="RCN Publishing">RCN Publishing</a></td>
<td>English</td>
<td>1989-present
</td></tr>
<tr>
<td><i><a href="/wiki/Obstetrics_%26_Gynecology_(journal)" title="Obstetrics &amp; Gynecology (journal)">Obstetrics and Gynecology</a></i></td>
<td>Obstetrics, Gynecology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1953-present
</td></tr>
<tr>
<td><i><a href="/wiki/Open_Medicine_(De_Gruyter_journal)" title="Open Medicine (De Gruyter journal)">Open Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Walter_de_Gruyter" title="Walter de Gruyter">Walter de Gruyter</a></td>
<td>English</td>
<td>2006-present
</td></tr>
<tr>
<td><i><a href="/wiki/Orbit_(journal)" title="Orbit (journal)">Orbit</a></i></td>
<td><a href="/wiki/Ophthalmology" title="Ophthalmology">Ophthalmology</a></td>
<td><a href="/wiki/Informa" title="Informa">Informa Healthcare</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Osteoporosis_International" title="Osteoporosis International">Osteoporosis International</a></i></td>
<td>Bone Health</td>
<td><a href="/w/index.php?title=Spring_Science%2BBusiness_Media&amp;action=edit&amp;redlink=1" class="new" title="Spring Science+Business Media (page does not exist)">Spring Science+Business Media</a></td>
<td>English</td>
<td>1990-present
</td></tr>
<tr>
<td><i><a href="/wiki/Ostomy_Wound_Management" title="Ostomy Wound Management">Ostomy Wound Management</a></i></td>
<td>Wound care</td>
<td><a href="/w/index.php?title=HMP_Communications&amp;action=edit&amp;redlink=1" class="new" title="HMP Communications (page does not exist)">HMP Communications</a></td>
<td>English</td>
<td>1980-present
</td></tr>
<tr>
<td><i><a href="/wiki/Paediatrics_%26_Child_Health" title="Paediatrics &amp; Child Health">Paediatrics &amp; Child Health</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English</td>
<td>1996-present
</td></tr>
<tr>
<td><i><a href="/wiki/Pain_Research_%26_Management" title="Pain Research &amp; Management">Pain Research &amp; Management</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English, French</td>
<td>1996-present
</td></tr>
<tr>
<td><i><a href="/wiki/Pan_American_Journal_of_Public_Health" title="Pan American Journal of Public Health">Pan American Journal of Public Health</a></i></td>
<td>Public Health</td>
<td><a href="/wiki/Pan_American_Health_Organization" title="Pan American Health Organization">Pan American Health Organization</a></td>
<td>English, Portuguese, Spanish</td>
<td>1997-present
</td></tr>
<tr>
<td><i><a href="/wiki/Pathologica" title="Pathologica">Pathologica</a></i></td>
<td>Pathology</td>
<td><a href="/w/index.php?title=Societ%C3%A0_Anatomo_Patologi_Ospedalieri_Italiani&amp;action=edit&amp;redlink=1" class="new" title="Società Anatomo Patologi Ospedalieri Italiani (page does not exist)">Società Anatomo Patologi Ospedalieri Italiani</a></td>
<td>Italian, English</td>
<td>1908-present
</td></tr>
<tr>
<td><i><a href="/wiki/Pediatric_Research" title="Pediatric Research">Pediatric Research</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/Nature_Publishing_Group" title="Nature Publishing Group">Nature Publishing Group</a></td>
<td>English</td>
<td>1967-present
</td></tr>
<tr>
<td><i><a href="/wiki/Pediatrics_(journal)" title="Pediatrics (journal)">Pediatrics</a></i></td>
<td>Pediatrics</td>
<td><a href="/wiki/American_Academy_of_Pediatrics" title="American Academy of Pediatrics">American Academy of Pediatrics</a></td>
<td>English</td>
<td>1948-present
</td></tr>
<tr>
<td><i><a href="/wiki/Personalized_Medicine_(journal)" title="Personalized Medicine (journal)">Personalized Medicine</a></i></td>
<td><a href="/wiki/Personalized_Medicine" class="mw-redirect" title="Personalized Medicine">Personalized Medicine</a></td>
<td><a href="/wiki/Future_Medicine" title="Future Medicine">Future Medicine</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/The_Physician_and_Sportsmedicine" title="The Physician and Sportsmedicine">The Physician and Sportsmedicine</a></i></td>
<td>Sports Medicine</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>1973-present
</td></tr>
<tr>
<td><i><a href="/wiki/Plastic_Surgery_(journal)" title="Plastic Surgery (journal)">Plastic Surgery</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/Pulsus_Group" title="Pulsus Group">Pulsus Group</a></td>
<td>English</td>
<td>1993-present
</td></tr>
<tr>
<td><i><a href="/wiki/PLoS_Medicine" class="mw-redirect" title="PLoS Medicine">PLoS Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Public_Library_of_Science" class="mw-redirect" title="Public Library of Science">Public Library of Science</a></td>
<td>English</td>
<td>2004-present
</td></tr>
<tr>
<td><i><a href="/wiki/PLoS_Neglected_Tropical_Diseases" class="mw-redirect" title="PLoS Neglected Tropical Diseases">PLoS Neglected Tropical Diseases</a></i></td>
<td>Global Health</td>
<td><a href="/wiki/Public_Library_of_Science" class="mw-redirect" title="Public Library of Science">Public Library of Science</a></td>
<td>English</td>
<td>2007-present
</td></tr>
<tr>
<td><i><a href="/wiki/Postgraduate_Medicine" title="Postgraduate Medicine">Postgraduate Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>1916-present
</td></tr>
<tr>
<td><i><a href="/wiki/Le_Practicien_en_Anesth%C3%A9sie_R%C3%A9animation" class="mw-redirect" title="Le Practicien en Anesthésie Réanimation">Le Practicien en Anesthésie Réanimation</a></i></td>
<td>Anaesthesiology</td>
<td><a href="/wiki/Elsevier_Masson" class="mw-redirect" title="Elsevier Masson">Elsevier Masson</a></td>
<td>English</td>
<td>1997-present
</td></tr>
<tr>
<td><i><a href="/wiki/Preventive_Medicine_(journal)" title="Preventive Medicine (journal)">Preventive Medicine</a></i></td>
<td>Preventative Medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1972-present
</td></tr>
<tr>
<td><i><a href="/wiki/Primary_Dental_Journal" title="Primary Dental Journal">Primary Dental Journal</a></i></td>
<td>Dentistry</td>
<td><a href="/wiki/Faculty_of_General_Dental_Practice" title="Faculty of General Dental Practice">Faculty of General Dental Practice</a></td>
<td>English</td>
<td>1994-present
</td></tr>
<tr>
<td><i><a href="/wiki/Progress_in_Osteoporosis" class="mw-redirect" title="Progress in Osteoporosis">Progress in Osteoporosis</a></i></td>
<td>Bone Health</td>
<td><a href="/wiki/International_Osteoporosis_Foundation" title="International Osteoporosis Foundation">International Osteoporosis Foundation</a></td>
<td>English</td>
<td>2000-present
</td></tr>
<tr>
<td><i><a href="/wiki/Psychiatric_Genetics_(journal)" title="Psychiatric Genetics (journal)">Psychiatric Genetics</a></i></td>
<td>Psychiatry</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1990-present
</td></tr>
<tr>
<td><i><a href="/wiki/Psychosomatic_Medicine_(journal)" title="Psychosomatic Medicine (journal)">Psychosomatic Medicine</a></i></td>
<td>Psychology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1939-present
</td></tr>
<tr>
<td><i><a href="/wiki/QJM:_An_International_Journal_of_Medicine" class="mw-redirect" title="QJM: An International Journal of Medicine">QJM: An International Journal of Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1907-present
</td></tr>
<tr>
<td><i><a href="/wiki/Radiology_(journal)" title="Radiology (journal)">Radiology</a></i></td>
<td>Radiology</td>
<td><a href="/wiki/Radiological_Society_of_North_America" title="Radiological Society of North America">Radiological Society of North America</a></td>
<td>English</td>
<td>1923-present
</td></tr>
<tr>
<td><i><a href="/wiki/Rambam_Maimonides_Medical_Journal" title="Rambam Maimonides Medical Journal">Rambam Maimonides Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Rambam_Health_Care_Campus" title="Rambam Health Care Campus">Rambam Health Care Campus</a></td>
<td>English</td>
<td>2010-present
</td></tr>
<tr>
<td><i><a href="/wiki/Rejuvenation_Research" title="Rejuvenation Research">Rejuvenation Research</a></i></td>
<td>Aging</td>
<td><a href="/wiki/Mary_Ann_Liebert" title="Mary Ann Liebert">Mary Ann Liebert</a></td>
<td>English</td>
<td>1998-present
</td></tr>
<tr>
<td><i><a href="/wiki/Research_and_Humanities_in_Medical_Education" title="Research and Humanities in Medical Education">Research and Humanities in Medical Education</a></i></td>
<td><a href="/wiki/Medical_humanities" title="Medical humanities">Medical humanities</a></td>
<td>Medical Humanities Group at the <a href="/wiki/University_College_of_Medical_Sciences" title="University College of Medical Sciences">University College of Medical Sciences</a></td>
<td>English</td>
<td>2014-present
</td></tr>
<tr>
<td><i><a href="/wiki/Revista_Pediatr%C3%ADa_de_Atenci%C3%B3n_Primaria" title="Revista Pediatría de Atención Primaria">Revista Pediatría de Atención Primaria</a></i></td>
<td>Pediatrics</td>
<td><a href="/w/index.php?title=Exlibris_Ediciones&amp;action=edit&amp;redlink=1" class="new" title="Exlibris Ediciones (page does not exist)">Exlibris Ediciones</a></td>
<td>English</td>
<td>1999-present
</td></tr>
<tr>
<td><i><a href="/wiki/Scandinavian_Journal_of_Infectious_Diseases" title="Scandinavian Journal of Infectious Diseases">Scandinavian Journal of Infectious Diseases</a></i></td>
<td>Infectious Disease</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>1969-present
</td></tr>
<tr>
<td><i><a href="/wiki/Scandinavian_Journal_of_Occupational_Therapy" title="Scandinavian Journal of Occupational Therapy">Scandinavian Journal of Occupational Therapy</a></i></td>
<td>Occupational Therapy</td>
<td><a href="/wiki/Informa_Healthcare" class="mw-redirect" title="Informa Healthcare">Informa Healthcare</a></td>
<td>English</td>
<td>1993-present
</td></tr>
<tr>
<td><i><a href="/wiki/Scandinavian_Journal_of_Surgery" title="Scandinavian Journal of Surgery">Scandinavian Journal of Surgery</a></i></td>
<td><a href="/wiki/Surgery" title="Surgery">Surgery</a></td>
<td><a href="/wiki/SAGE_Publications" class="mw-redirect" title="SAGE Publications">SAGE Publications</a></td>
<td>English</td>
<td>1919-present
</td></tr>
<tr>
<td><i><a href="/wiki/Scientia_Pharmaceutica" title="Scientia Pharmaceutica">Scientia Pharmaceutica</a></i></td>
<td>Pharmacology</td>
<td><a href="/w/index.php?title=%C3%96sterreichische_Pharmazeutische_Gesellschaft&amp;action=edit&amp;redlink=1" class="new" title="Österreichische Pharmazeutische Gesellschaft (page does not exist)">Österreichische Pharmazeutische Gesellschaft</a></td>
<td>English, German</td>
<td>1930-present
</td></tr>
<tr>
<td><i><a href="/wiki/Seminars_in_Ophthalmology" title="Seminars in Ophthalmology">Seminars in Ophthalmology</a></i></td>
<td>Ophthalmology</td>
<td><a href="/wiki/Taylor_%26_Francis" title="Taylor &amp; Francis">Taylor &amp; Francis</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/Spine_(journal)" title="Spine (journal)">Spine</a></i></td>
<td>Orthopedics</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1976-present
</td></tr>
<tr>
<td><i><a href="/wiki/Statistics_in_Medicine_(journal)" title="Statistics in Medicine (journal)">Statistics in Medicine</a></i></td>
<td>Statistics</td>
<td><a href="/wiki/John_Wiley_%26_Sons" title="John Wiley &amp; Sons">John Wiley &amp; Sons</a></td>
<td>English</td>
<td>1982-present
</td></tr>
<tr>
<td><i><a href="/wiki/Stroke_(journal)" title="Stroke (journal)">Stroke</a></i></td>
<td>Cardiology</td>
<td><a href="/wiki/Lippincott_Williams_%26_Wilkins" title="Lippincott Williams &amp; Wilkins">Lippincott Williams &amp; Wilkins</a></td>
<td>English</td>
<td>1970-present
</td></tr>
<tr>
<td><i><a href="/wiki/Surgical_Endoscopy" title="Surgical Endoscopy">Surgical Endoscopy</a></i></td>
<td>Surgery</td>
<td><a href="/wiki/Springer_Science%2BBusiness_Media" title="Springer Science+Business Media">Springer Science+Business Media</a></td>
<td>English</td>
<td>1986-present
</td></tr>
<tr>
<td><i><a href="/wiki/TAF_Preventive_Medicine_Bulletin" title="TAF Preventive Medicine Bulletin">TAF Preventive Medicine Bulletin</a></i></td>
<td>Preventive Medicine</td>
<td><a href="/w/index.php?title=Gulhane_Askeri_Tip_Akademisi&amp;action=edit&amp;redlink=1" class="new" title="Gulhane Askeri Tip Akademisi (page does not exist)">Gulhane Askeri Tip Akademisi</a></td>
<td>English</td>
<td>2001-present
</td></tr>
<tr>
<td><i><a href="/wiki/Tehran_University_Medical_Journal" title="Tehran University Medical Journal">Tehran University Medical Journal</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/University_of_Tehran" title="University of Tehran">University of Tehran</a></td>
<td>English</td>
<td>1943-present
</td></tr>
<tr>
<td><i><a href="/w/index.php?title=The_Journal_of_Neurobehavioural_Sciences&amp;action=edit&amp;redlink=1" class="new" title="The Journal of Neurobehavioural Sciences (page does not exist)">The Journal of Neurobehavioural Sciences</a></i></td>
<td>Neurology</td>
<td><a href="/wiki/%C3%9Csk%C3%BCdar_University" title="Üsküdar University">Üsküdar University</a></td>
<td>English</td>
<td>2014-present
</td></tr>
<tr>
<td><i><a href="/wiki/Transactions_of_the_Royal_Society_of_Tropical_Medicine_and_Hygiene" title="Transactions of the Royal Society of Tropical Medicine and Hygiene">Transactions of the Royal Society of Tropical Medicine and Hygiene</a></i></td>
<td>Global Health</td>
<td><a href="/wiki/Oxford_University_Press" title="Oxford University Press">Oxford University Press</a></td>
<td>English</td>
<td>1908-present
</td></tr>
<tr>
<td><i><a href="/wiki/Trends_(journals)" title="Trends (journals)">Trends in Molecular Medicine</a></i></td>
<td>Medicine</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1995-present
</td></tr>
<tr>
<td><i><a href="/wiki/Women%27s_Health_Issues_(journal)" title="Women's Health Issues (journal)">Women's Health Issues</a></i></td>
<td>Women's Health</td>
<td><a href="/wiki/Elsevier" title="Elsevier">Elsevier</a></td>
<td>English</td>
<td>1990-present
</td></tr></tbody><tfoot></tfoot></table>"""
parser.feed(htmlstr)
for link in links:
    print(link)


'''
class MyHTMLParser2(HTMLParser):

    def handle_starttag(self, tag, attrs):
        if tag == "table":
            if attrs[0][1] == "infobox hproduct":
                
                print("Encountered a start tag:", attrs)
           


parser2 = MyHTMLParser2()

for link in links:
    url = "http://en.wikipedia.org"+link[0][1]
    try:
        doc=requests.get(url)
        htmltext = doc.text
        #parser2.feed(htmltext)
        soup = BeautifulSoup(htmltext, 'html.parser')
        t = soup.find("table", {"class":"infobox hproduct"})
        #print(t)
        #table = soup.find(lambda tag: tag.name == "table" and tag.has_attr('class') and tag['class']=="infobox hproduct")
        rows = t.findAll(lambda tag: tag.name == 'a')
        for row in rows:
            if row.getText() == "Journal homepage":
                f.write(row['href'])
                print(row['href'])

        #rowstext = rows[0].getText()
        what = soup.findAll("table", {"class": "infobox hproduct"})

        #print(what[0])
        table = BeautifulSoup(what[0], 'html.parser')
        print(table)
        table.prettify()
        linksInTable = table.findAll("a")
        print(linksInTable)
    except:
        continue
'''