import pandas as pd
import os
from bs4 import BeautifulSoup


def csvToOrders(path = "./files/"):
    # This directory contains a bacth of CSV exports obtained from serching each BOA
    # TODO: Create script to auto get the CSV exports
    path = "./files/"
    dir_list = os.listdir(path)
    
    orders = list()


    for file in dir_list:
        # Read each CSV export from the BOA searches
        df = pd.read_csv(path+file, sep=',')

        # Slice down to only the relevant information
        df = df[['Contract ID', 'Reference IDV', 'Modification Number', 'Date Signed']]

        # Convert text date to datetime format
        df['Date Signed'] = df['Date Signed'].apply(pd.to_datetime)

        # Sort by date
        df = df.sort_values(by='Date Signed', ascending=False)

        # Dropping rows with NaN in them. This removes any order without a reference to the BOAs
        df = df.dropna()

        for index, row in df.iterrows():
            # Pull out each row into variables
            idv, ref, mod, datesign = row
            #idv = row[0]
            #ref = row[1]
            #mod = row[2]
            #datesign = row[3]

            # Since the df is sorted by date, we only want to find the first instance of each IDV
            # Check to see if an idv has previously been added to the orders list
            if not idv in [order[0] for order in orders]:
                orders.append([idv, ref, mod, datesign])

    # Create new dataframe of just the most recent mod to each order
    orderdf = pd.DataFrame(orders)

    # Add column headers
    orderdf.columns = ['Contract ID', 'Reference IDV', 'Modification Number', 'Date Signed']

    return orderdf

def htmToOrders(orderdict, path = "./transactions/"):
    # Directory contains the html for each site containing the official order document with the total amounts
    # TODO: Pull from the web instead of relying on local copies
    path = "./transactions/"
    dir_list = os.listdir(path)

    # Ignore anything that isn't a .htm file
    # TODO: Add html into this logic
    files = [f for f in dir_list if f[-4:] == '.htm']
    for file in files:
        print(file)
        
        # Open file and send handler to BS4
        f = open(path+file)
        soup = BeautifulSoup(f, "html.parser")
        
        # TODO: Create function to pretty this up
        # Get Contract Value
        # Contracts use one of two different tags for contract value
        soupfinder = soup.find(id="totalUltimateContractValueCell")
        if soupfinder['style'] == 'display:none':
            print("## NO SOUP! ##")
            soupfinder = soup.find(id="ultimateContractValue")
        else:
            soupfinder = soup.find(id="totalUltimateContractValue")
        
        if 'value' in soupfinder.attrs:
            contract_value = soupfinder['value']
        else:
            contract_value = 'Not Found'

        # Get reference idv (BOA)
        soupfinder = soup.find(id='idvPIID')
        if 'value' in soupfinder.attrs:
            idvPIID = soupfinder['value']
        else:
            idvPIID = 'Not Found'

        soupfinder = soup.find(id='PIID')
        if 'value' in soupfinder.attrs:
            PIID = soupfinder['value']
        else:
            PIID = 'Not Found'
        
        # Get idv
        if PIID in orderdict:
            orderdict[PIID]['total'] = contract_value

        print(PIID, idvPIID, contract_value)
        f.close()

    finaldf = pd.DataFrame.from_dict(orderdict, orient='index')
    finaldf.to_csv('final.csv', encoding='utf-8')

    print(finaldf)

    return finaldf

def makeURLs(orderdf):
    ps = 'Start-Process \'C:\\Program Files\\Mozilla Firefox\\firefox.exe\\\' -ArgumentList \''
    orderdict = dict()

    targets = list()
    for index, row in orderdf.iterrows():
        idv = row[0]
        ref = row[1]
        mod = row[2]
        datesign = row[3]
        orderdict[idv] = {"ref": ref, "mod": mod, "date": datesign, "total": None}
        url = f'https://www.fpds.gov/ezsearch/jsp/viewLinkController.jsp?agencyID=9700&PIID={idv}&modNumber={mod}&transactionNumber=0&idvAgencyID=9700&idvPIID={ref}&actionSource=searchScreen&actionCode=&documentVersion=1.5&contractType=AWARD&docType=C'
        ps_url = ps + url + '\''
        targets.append(ps_url)

    return [targets, orderdict]

df = csvToOrders()
targets, orderdict = makeURLs(df)
orderdf = htmToOrders(orderdict)
