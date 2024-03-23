import { test, expect } from '@playwright/test';

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test.describe.parallel('KYG Client Integration API', ()=> {
    const baseUrl = 'https://api.kygid.app/integrations';
    const accessToken = '82a285bf02527afd5cc63c087d0e7c5cb7ade9ca3f32533dc032cf85';

    let itemTypes = ["project", "tcpn"];
        let names = [
        "CELL PHONE SIGNAL BOOSTER, 4G, UP TO 5000 SQ FT, INCLUDES 1) OUTSIDE PANEL ANTENNA, HOME 4G 2) POWER SUPPLY AND 3) INSIDE DESKTOP ANTENNA, WEBOOST",
        "Lithium Battery",
        "Shorts",
        "football",
        "Fantastic Rubber Chips",
        "ADHESIVE, LOCTITE, (USE WITH SPLIT SEAL), MODEL ADS-20SD",
        "Ergonomic Metal Hat",
        "Handcrafted Frozen Car",
        "Practical Plastic Bike",
        "Unbranded Granite Gloves",
        "Generic Granite Shirt",
        "Sleek Cotton Bacon",
        "COOLER, OIL/AIR RAD, FOR AIR COMPRESSOR, GARDNER DENVER",
        "CONVERSION KIT FOR AIR COMPRESSOR GARDNER DENVER",
        "CONNECTOR, 1/4 IN FOR AIR COMPRESSOR, GARDNER DENVER",
        "V-BELT, WRAPPED, TYPE B, 106 IN NOMINAL OUTSIDE LENGTH, 21/32 IN TOP WIDTH, 7/16 IN THICKNESS",
        "BUSHING SHEAVE FOR AIR COMPRESSOR GARDNER DENVER",
        "BUSHING HUB FOR AIR COMPRESSOR GARDNER DENVER",
        "VALVE, PRESSURE RELIEF FOR COLD START ENGINE",
        "MOTOR, ELECTRIC, 30 HP, 1800 RPM, 230/460V, 180L FRAME, 60HZ, 3PH, FOR SSR UP6 30, INGERSOL RAND",
        "SOLENOID SET WITH MANIFOLD FOR AIR COMPRESSOR, GREAT LAKES",
        "SHEAVE FOR AIR COMPRESSOR, GARDNER DENVER",
        "SEAL, PER FOOT, FOR AIR COMPRESSOR, GARDNER DENVER",
        "SCREEN, 2 IN X 1-1/2 IN FOR AIR DRYERS, GREAT LAKES",
        "PROBE, THERMISTOR FOR AIR COMPRESSOR, GARDNER DENVER",
        "PLUG, FOR AIR COMPRESSOR, INTEGRA 25 HP WITH AIRSMART, MAIN ASSEMBLY T6, GARDNER DENVER",
        "OIL SCREEN FOR AIR COMPRESSOR, GARDNER DENVER",
        "O-RING, FOR OIL SEPARATOR, USED ON GARDNER DENVER EFC99 AIR COMPRESSOR",
        "SPRING, GAS FOR AIREND ASSEMBLY, USED ON AIR COMPRESSOR, MODEL SSR UP6 30 60HZ, INGERSOLL RAND",
        "V-BELT, A85, COLD START, 2245E10V, INGERSOLL RAND",
        "CONTACTOR, 60HZ, C37 FOR INSTRUMENTATION AND ELECTRICAL SYSTEM, USED ON AIR COMPRESSOR SSR UP6 30, 100C37D00, INGERSOLL RAND",
        "NEEDLE VALVE, VARIABLE SPEED CONTROL, 1-1/4 IN NPT, 5000 PSI WORKING PRESSURE, FOR MA3137 ROTARY TABLE",
        "AIR COMPRESSOR, 30 HP, 460V, 3P, CONTINUOUS DUTY 129.9 CFM AT 125 PISG, (GARDNER DENVER L23)",
        "KIT, CONVERSION, T6, SCAVENGER LINE, FOR AIR COMPRESSOR, GARDNER DENVER",
        "TEE, FOR CONTROL PIPING, AIR COMPRESSOR, MODEL SSR UP6 30 60HZ, INGERSOLL RAND",
        "UNLOADER VALVE, SOLENOID, 24VDC, FOR GARDNER DENVER EFC99J AND EDE99N",
        "BLOWDOWN VALVE, SOLENOID, FOR GARDNER DENVER EFC99J AND EDE99N",
        "KIT, STARTER, 24V COIL, WITH 24CA6029 OVERLOAD RELAY AND 24CA6042 AUX CONTACT BLOCK, USED ON EFC99A COMPRESSOR, GARDNER DENVER",
        "SPARE PARTS KIT, FOR PNEUMATIC CONTROLS, FOR AIR COMPRESSOR, GARDNER DENVER"
    ];

    const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    const itemName = names[Math.floor(Math.random() * names.length)];

    test("CI should require token", async ({ request }) => {
        const response = await request.post(`${baseUrl}/product`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer `
            }
        });
    
        const responseBody = await response.json(); // Parse response as JSON
    
        expect(responseBody).toMatchObject({
            responseMessage: "",
            errorMsg: ["Incorrect api key", "Unauthorized"]
        });
    });
    

    test('POST Request - Create Product Item', async ({ request }) => {
        let sequentialNumber = getRandomNumber(1, 1000000000000);
        sequentialNumber++;

    const response = await request.post(`${baseUrl}/product`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            requestorId: "1520",
            itemType: itemType,
            itemUniqueIdentifier: `1235-11A1B12655123AB${sequentialNumber}`,
            itemRevision: "A",
            itemSubtype: "BEZEL - bezel",
            brandOwner: "Mike",
            itemName: itemName,
            itemDescription: itemName,
            kygId: "",
            katId: "",
            businessUnit: "CRP",
            rdo: "0006"
        },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response?.status()).toBe(200);
    expect(responseBody.kygId).not.toBe(null);
    expect(responseBody.katId).toBe("");
    expect(responseBody.responseMessage).toBe("Item was created");
    expect(responseBody.attributes.itemRevision).toContain("A");
    expect(responseBody.attributes.itemSubtype).toBe('BEZEL - Bezel');
    expect(responseBody.attributes.brandOwner).toBe('Mike');
    expect(responseBody.attributes.itemName).not.toBe(null);
    expect(responseBody.attributes.itemDescription).not.toBe(null);
    expect(responseBody.attributes.kygId).toBe('');
    expect(responseBody.attributes.katId).toBe('');
    expect(responseBody.attributes.businessUnit).toBe('CRP - Corporate');
    expect(responseBody.attributes.rdo).toBe('0006');
    expect(responseBody.attributes.createdDate).not.toBe(null);
    expect(responseBody.attributes.modifiedDate).not.toBe(null);


    console.log(responseBody)
    });

    test('POST Request - Create ECN Assessment', async ({ request }) => {
        let sequentialNumber = getRandomNumber(1, 1000000000000);
        sequentialNumber++;

    const response = await request.post(`${baseUrl}/product`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            requestorId: "1520",
            itemType: itemType,
            itemUniqueIdentifier: `1235-11A1B12655123AB${sequentialNumber}`,
            itemRevision: "A",
            itemSubtype: "BEZEL - bezel",
            brandOwner: "Mike",
            itemName: itemName,
            itemDescription: itemName,
            kygId: "",
            katId: "",
            businessUnit: "CRP",
            rdo: "0006",
            assessmentType: "initial",
            assessmentReason: "New Item",
            assessmentCategory: "ECN",
            assessmentExportCountry: "US",
            assessmentImportCountry: "US",
        },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response?.status()).toBe(200);
    expect(responseBody.kygId).not.toBe(null);
    expect(responseBody.katId).not.toBe("");
    expect(responseBody.responseMessage).toBe("Item was created");
    expect(responseBody.attributes.itemName).not.toBe(null);
    expect(responseBody.attributes.itemDescription).not.toBe(null);
    expect(responseBody.attributes.kygId).toBe('');
    expect(responseBody.attributes.katId).toBe('');
    expect(responseBody.attributes.createdDate).not.toBe(null);
    expect(responseBody.attributes.modifiedDate).not.toBe(null);
    expect(responseBody.attributes.assessmentType).toBe('Initial Classification');
    expect(responseBody.attributes.assessmentReason).toBe('New Item');
    expect(responseBody.attributes.assessmentCategory).toBe('ECN');
    expect(responseBody.attributes.assessmentExportCountry).toBe('US');
    expect(responseBody.attributes.assessmentImportCountry).toBe('US');
    console.log(responseBody)
    });


    test('POST Request - Create HS Assessment', async ({ request }) => {
        let sequentialNumber = getRandomNumber(1, 1000000000000);
        sequentialNumber++;

    const response = await request.post(`${baseUrl}/product`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            requestorId: "1520",
            itemType: itemType,
            itemUniqueIdentifier: `1235-11A1B12655123AB${sequentialNumber}`,
            itemRevision: "A",
            itemSubtype: "BEZEL - bezel",
            brandOwner: "Mike",
            itemName: itemName,
            itemDescription: itemName,
            kygId: "",
            katId: "",
            businessUnit: "CRP",
            rdo: "0006",
            assessmentType: "initial",
            assessmentReason: "New Item",
            assessmentCategory: "HS",
            assessmentExportCountry: "US",
            assessmentImportCountry: "US",
        },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response?.status()).toBe(200);
    expect(responseBody.kygId).not.toBe(null);
    expect(responseBody.katId).not.toBe("");
    expect(responseBody.responseMessage).toBe("Item was created");
    expect(responseBody.attributes.itemName).not.toBe(null);
    expect(responseBody.attributes.itemDescription).not.toBe(null);
    expect(responseBody.attributes.kygId).toBe('');
    expect(responseBody.attributes.katId).toBe('');
    expect(responseBody.attributes.createdDate).not.toBe(null);
    expect(responseBody.attributes.modifiedDate).not.toBe(null);
    expect(responseBody.attributes.assessmentType).toBe('Initial Classification');
    expect(responseBody.attributes.assessmentReason).toBe('New Item');
    expect(responseBody.attributes.assessmentCategory).toBe('HS');
    expect(responseBody.attributes.assessmentExportCountry).toBe('US');
    expect(responseBody.attributes.assessmentImportCountry).toBe('US');
    console.log(responseBody)
    });
    

    test('GET Request - Get Product', async ({ page }) => {
        const kygId = 49080;
        const itemIdentifier = "1235-11A1B12655123AB452456488949";
        const revision = 'A';
        const itemType = 'project';

        const url = `https://api.kygid.app/integrations/product?kygId=${kygId}&itemIdentifier=${itemIdentifier}&revision=${revision}&itemType=${itemType}`;

        await page.goto(url, { waitUntil: 'networkidle' });

        await page.setExtraHTTPHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer 82a285bf02527afd5cc63c087d0e7c5cb7ade9ca3f32533dc032cf85'
    });

    const responseBody = await page.evaluate(async (url) => {
        const response = await fetch(url);
        return await response.json();
    }, url);

    expect(responseBody.responseMessage).toEqual('Item was found');
    expect(responseBody.errorMsg).toBeEmpty;
    console.log(responseBody)
    });

    test('POST Request - External outbound call (re call)', async ({ request }) => {
        const queueId = 100;
        const response = await request.post(`${baseUrl}/product/outbound/${queueId}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.transactionId).toBe(100);
    expect(responseBody.kygId).toBe(14953);
    expect(responseBody.katId).toBe(6590);
    expect(responseBody.responseMsg).toBe("getaddrinfo ENOTFOUND plmhubdev.connect.te.com");
    expect(responseBody.status).toBe(-1);
    expect(responseBody.transactionDateTime).not.toBe(null);
    expect(responseBody.queueDateTime).not.toBe(null);
    });

    test.only('GET Request - Get Outbound Queue record(s)', async ({ request }) => {
        const queueId = 100;
        const status = 1;
        const response = await request.get(`${baseUrl}/product/outbound?queueId=100&status=1`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.length).toBe(1);
    expect(responseBody.items.transactionId).toBe(100);
    expect(responseBody.items.kygId).toBe(14953);
    expect(responseBody.items.katId).toBe(6590);
    expect(responseBody.items.responseMsg).toBe("getaddrinfo ENOTFOUND plmhubdev.connect.te.com");
    expect(responseBody.items.status).toBe(-1);
    expect(responseBody.items.transactionDateTime).not.toBe(null);
    expect(responseBody.items.queueDateTime).not.toBe(null);
    });

})
