const config = require("./helpers/config");
const path = require('path');
const { assert } = require("assert").strict;
const { fstat } = require("fs");
const { Builder, By, Key, until, WebElement } = require("selenium-webdriver");
//---------------------Login Process-------------------------------
const URL = config.TEST_URL;
const userName = config.AD_USER_NAME;
const userPass = config.AD_USER_PASSWORD;
//-----------------------------------------------------------------
//---------------------After Login Process------------------------------
//Individual | Business
let customerType = "Individual";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//Interest_and_penalty | Merit | Refund
let caseType = "Refund";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//Refuse | Real_estate| Owner_occupied | Water_revenue | Business_tax | Licenses_and_inspections | Water | Airport | Parking
let taxCategory = "Refuse";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//--> Refuse: Refuse_collection

let taxType = "Refuse_collection";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
let firstName = taxCategory; //requiredField
let lastName = "AutomatedTest"; //requiredField
let phoneNumber = config.AD_PHONE_NUMBER;
let emailAdd = config.AD_USER_NAME;
let mailingAddress = config.AD_MAILING_ADDRESS; //requiredField
// mail | email
let preferredCorrespondence = "mail";
let city = config.AD_CITY; //requiredField
//Pennsylvania | New_York | New_Jersey
let stateName = config.AD_STATE; //requiredField
let ZipCode = config.AD_ZIP_CODE; //requiredField
//Licenses_and_inspections | Revenue | Airport | PPA | PWD | Water_Revenue_Bureau
let departmentName = "Revenue";
let accNumber = config.AD_ACCNUMBER;
let disputedPeriodStart = config.DIS_PERIOD_START;
let disputedPeriodEnd = config.DIS_PERIOD_END;
let principalamt = 89000;
let interestamt = 14000;
let penaltyamt = 7300;
let commentTest = config.commentTest;
let businessName = config.businessName;
let caseDescription = config.commentTest;
//Spanish | English | French  (need to add none for no interpreter)
let InterpreterLang = "French";
//Approve_Case | Deny_Case | Save_as_Incomplete
let caseDecision = "Approve_Case";

//------------------------------CURRENT-DATE-------------------
let effectiveDate = new Date(); //effective date is the date the petitioner filled the petition.
let dd = effectiveDate.getDate();

let mm = effectiveDate.getMonth() + 1;
let yyyy = effectiveDate.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

effectiveDate = mm + "/" + dd + "/" + yyyy;
//------------------------------CURRENT-DATE-------------------
//------------------------------INITIAL DATE-------------------
//initial bill date is the date of the bill they are challenging.

let currentDate = new Date();
let initialBillDate = new Date();
initialBillDate.setDate(currentDate.getDate() - 20); //---20 days prior

let month = initialBillDate.getMonth() + 1;
let day = initialBillDate.getDate();
let year = initialBillDate.getFullYear();
initialBillDate = `${month.toString().padStart(2, "0")}/${day
  .toString()
  .padStart(2, "0")}/${year}`;
//--------------------------------------------------------------

//MicrosoftEdge | chrome
let browserSelect = "chrome";

//----------------------------------------------------------------------------------------------------
//-------------------------------------TRB AUTOMATION CODE--------------------------------------------
//----------------------------------------------------------------------------------------------------

//describe block
describe("TRB | Refuse Tax Category - Test Started", function () {
  //it block

  it("Refuse - Test Automation", async function () {
    //non-headless----------------------------------------------------
    /*
    let driver = await new Builder().forBrowser(browserSelect).build();
    await driver.manage().window().maximize();
*/
    //non-headless----------------------------------------------------

    //Headless code block

    const { Builder } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.windowSize({ width: 1920, height: 1080 }); // Corrected method name

    const browserSelect = "chrome"; // browser

    let driver = await new Builder()
      .forBrowser(browserSelect)
      .setChromeOptions(options)
      .setChromeService(new chrome.ServiceBuilder(browserSelect.path))
      .build();

    //Headless code block

    // launch the chrome browser and navigate to TRB
    await driver.get(URL);

    //signing in using city credentials.
    await driver.manage().setTimeouts({ implicit: 10000 });

    await driver.sleep(5000);

    await driver
      .findElement(By.xpath("//button[normalize-space()='SIGN IN']"))
      .click();

    //needed use implicit wait in order to give DOM certain duration to load to find element
    await driver.sleep(5000);
    await driver.manage().setTimeouts({ implicit: 20000 });

    await driver
      .findElement(By.xpath("//input[@id='signInName']"))
      .sendKeys(userName);
    await driver
      .findElement(By.xpath("//input[@id='password']"))
      .sendKeys(userPass);

    await driver.findElement(By.xpath("//button[@id='next']")).click();

    //after logging in - entering text or keywords
    await driver.manage().setTimeouts({ implicit: 7000 });

    //click on add new case
    await driver
      .findElement(By.xpath("//span[normalize-space()='ADD NEW CASE']"))
      .click();

    //----------------------------------------------------------------------------------------------------
    //Click on individual or business

    switch (customerType) {
      case "Individual":
        await driver
          .findElement(By.xpath("//label[normalize-space()='Individual']"))
          .click();
        break;
      case "Business":
        await driver
          .findElement(By.xpath("//label[normalize-space()='Business']"))
          .click();
        break;
    }

    //----------------------------------------------------------------------------------------------------

    await driver
      .findElement(By.xpath("//div/select[1][@name='caseTypeId']"))
      .click();

    //----------------------------------------------------------------------------------------------------
    switch (caseType) {
      case "Interest_and_penalty":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Interest and penalty')]"))
          .click();
        break;
      case "Merit":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Merit')]"))
          .click();
        break;
      case "Refund":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Refund')]"))
          .click();
        break;
    }

    switch (taxCategory) {
      case "Refuse":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Refuse')]"))
          .click();
        break;

      case "Real_estate":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Real estate']")
          )
          .click();
        break;

      case "Owner_occupied":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Owner occupied']")
          )
          .click();
        break;

      case "Water_revenue":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Water revenue']")
          )
          .click();
        break;

      case "Business_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Business tax']")
          )
          .click();
        break;

      case "Licenses_and_inspections":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Licenses and inspections']"
            )
          )
          .click();
        break;

      case "Water":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Water']"))
          .click();
        break;

      case "Airport":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Airport']"))
          .click();
        break;

      case "Parking":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Parking']"))
          .click();
        break;
    }

    //----------------------------------------------------------------------------------------------------
    //-----------------------------------Refuse Tax Type--------------------------------------------------
    //----------------------------------------------------------------------------------------------------

    switch (taxType) {
      //refuse tax type
      case "Refuse_collection":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Refuse collection']")
          )
          .click();
        break;

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Real Estate Tax Type----------------------------------------------
      //----------------------------------------------------------------------------------------------------

      //real estate tax type
      case "Realty_transfer":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Realty transfer']")
          )
          .click();
        break;

      case "Real_estate":
        //sibiling xpath type***************************************************************
        await driver
          .findElement(By.xpath("//select[@name='taxTypeId']/option[3]"))
          .click();
        break;

      case "Real_estate_lien":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Real estate lien')]"))
          .click();
        break;

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Owner Occupied Tax Type-------------------------------------------
      //----------------------------------------------------------------------------------------------------

      case "Senior_citizen_forgiveness":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Senior citizen forgiveness']"
            )
          )
          .click();
        break;

      case "Real_estate_LOOP_program":
        //sibiling xpath type************
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Real estate LOOP program']"
            )
          )
          .click();
        break;

      case "Owner_occupied_payment":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Owner occupied payment']"
            )
          )
          .click();
        break;

      //----------------------------------------------------------------------------------------------------
      //----------------------------------WATER REVENUE TAX TYPE--------------------------------------------
      //----------------------------------------------------------------------------------------------------

      case "Shut_off":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Shut off']")
          )
          .click();
        break;

      case "TAP":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='TAP']"))
          .click();
        break;

      case "Water_revenue":
        //sibiling xpath type***************************************************************
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Water revenue']")
          )
          .click();
        break;

      case "Occupancy_dispute":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Occupancy dispute']")
          )
          .click();
        break;

      //----------------------------------------------------------------------------------------------------
      //--------------------------------------------Business Tax Type---------------------------------------
      //----------------------------------------------------------------------------------------------------
      case "Business_income_and_receipts":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Business income and receipts']"
            )
          )
          .click();
        break;

      case "Commercial_Development":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Commercial Development']"
            )
          )
          .click();
        break;

      case "Outdoor_advertisement_tax":
        //sibiling xpath type***************************************************************
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Outdoor advertisement tax']"
            )
          )
          .click();
        break;

      case "Amusement_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Amusement tax']")
          )
          .click();
        break;

      case "Billboard_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Billboard tax']")
          )
          .click();
        break;

      case "Corporate_net_income_tax":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Corporate net income tax']"
            )
          )
          .click();
        break;

      case "Hospital_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Hospital tax']")
          )
          .click();
        break;

      case "Hotel_room_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Hotel room tax']")
          )
          .click();
        break;

      case "Outdoor_advertisement_tax":
        //sibiling xpath type***************************************************************
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Outdoor advertisement tax']"
            )
          )
          .click();
        break;

      case "Liquor_sales_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Liquor sales tax']")
          )
          .click();
        break;

      case "Parking_lot_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Parking lot tax']")
          )
          .click();
        break;

      case "Philly_beverage_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Philly beverage tax']")
          )
          .click();
        break;

      case "Valet_parking_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Valet parking tax']")
          )
          .click();
        break;

      case "Wage_tax_monthly":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Wage tax monthly']")
          )
          .click();
        break;

      case "Wage_tax_quarterly":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Wage tax quarterly']")
          )
          .click();
        break;

      case "Wage_tax_weekly":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Wage tax weekly']")
          )
          .click();
        break;

      case "Business_tax":
        await driver
          .findElement(
            By.xpath(
              "//select[@name='taxTypeId']/option[normalize-space()='Business tax']"
            )
          )
          .click();
        break;

      case "Earnings_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Earnings tax']")
          )
          .click();
        break;

      case "Use_and_occupancy_tax":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Use and occupancy tax']"
            )
          )
          .click();
        break;

      case "School_income_tax":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='School income tax']")
          )
          .click();
        break;

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Licenses and Inspections Tax--------------------------------------
      //----------------------------------------------------------------------------------------------------
      case "Housing_and_Commerical_development":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='Use and Occupancy tax']"
            )
          )
          .click();
        break;

      case "Building_permit":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Building permit']")
          )
          .click();
        break;

      case "Clean_and_seal":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Clean and seal']")
          )
          .click();
        break;

      case "Demolition":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Demolition']")
          )
          .click();
        break;

      case "License_fee":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='License fee']")
          )
          .click();
        break;

      case "Nuisance_abate":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Nuisance abate']")
          )
          .click();
        break;

      case "License_and_inspection":
        await driver
          .findElement(
            By.xpath(
              "//select/option[normalize-space()='License and inspection']"
            )
          )
          .click();
        break;
      //L&I tax type ends

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Water Tax Type----------------------------------------------------
      //----------------------------------------------------------------------------------------------------

      case "Water_department":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Water department']")
          )
          .click();
        break;

      case "Meter":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Meter']"))
          .click();
        break;

      case "Pipes":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Pipes']"))
          .click();
        break;

      case "Storm_water":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Storm water']")
          )
          .click();
        break;

      case "Help_loan":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Help loan']")
          )
          .click();
        break;
      //water tax type ENDS here

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Airport Tax Type--------------------------------------------------
      //----------------------------------------------------------------------------------------------------
      case "Airport":
        await driver
          .findElement(
            By.xpath(
              "//select[@name='taxTypeId']/option[normalize-space()='Airport']"
            )
          )
          .click();
        break;
      //Airport tax type ENDS here

      //----------------------------------------------------------------------------------------------------
      //----------------------------------Parking Tax Type--------------------------------------------------
      //----------------------------------------------------------------------------------------------------
      case "Disable_parking":
        await driver
          .findElement(
            By.xpath(
              "//select[@name='taxTypeId']/option[normalize-space()='Disable parking']"
            )
          )
          .click();
        break;

      case "Dirt_bike":
        await driver
          .findElement(
            By.xpath(
              "//select[@name='taxTypeId']/option[normalize-space()='Dirt bike']"
            )
          )
          .click();
        break;

      case "ATV":
        await driver
          .findElement(
            By.xpath(
              "//select[@name='taxTypeId']/option[normalize-space()='ATV']"
            )
          )
          .click();
        break;
      //Parking tax type ENDS here
    }
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------

    //await driver.findElement(By.xpath("*//button[normalize-space()='SAVE AND CONTINUE']")).click();

    //----------------------------------------------------------------------------------------------------
    //first name
    await driver
      .findElement(By.xpath("//input[@name='firstName']"))
      .sendKeys(firstName);
    //lastname
    await driver
      .findElement(By.xpath("//input[@name='lastName']"))
      .sendKeys(lastName);
    //phoneNumber
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver
      .findElement(By.xpath("//input[@name='phoneNumber[0]']"))
      .click();
    await driver
      .findElement(By.xpath("//input[@name='phoneNumber[0]']"))
      .sendKeys(phoneNumber);
    await driver.findElement(By.xpath("//option[@value='Mobile']")).click();

    //----------------------------------------------------------------------------------------------------

    switch (customerType) {
      case "Business":
        await driver
          .findElement(By.xpath("//input[@name='businessName']"))
          .sendKeys(businessName);
        break;
    }

    //----------------------------------------------------------------------------------------------------
    //interpreter selection

    await driver
      .findElement(
        By.xpath("//label[normalize-space()='Interpreter requested']")
      )
      .click();

    switch (InterpreterLang) {
      case "Spanish":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Spanish')]"))
          .click();
        break;
      case "English":
        await driver
          .findElement(By.xpath("//*[contains(text(),'English')]"))
          .click();
        break;
      case "French":
        await driver
          .findElement(By.xpath("//*[contains(text(),'French')]"))
          .click();
        break;
    }

    //----------------------------------------------------------------------------------------------------

    switch (preferredCorrespondence) {
      case "mail":
        //MAIL or EMAIL option
        await driver
          .findElement(By.xpath("//label[normalize-space()='Mail']"))
          .click();
        break;
      case "email":
        await driver
          .findElement(By.xpath("//label[normalize-space()='Email']"))
          .click();
        await driver
          .findElement(By.xpath("//input[@name='emailAddress']"))
          .sendKeys(emailAdd);
        break;
    }

    //mailing address
    await driver
      .findElement(By.xpath("//input[@name='streetAddress1']"))
      .sendKeys(mailingAddress);

    //city
    await driver.findElement(By.xpath("//input[@name='city']")).sendKeys(city);

    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------

    switch (stateName) {
      case "Pennsylvania":
        await driver.findElement(By.xpath("//option[@value='PA']")).click();
        break;
      case "New_York":
        await driver.findElement(By.xpath("//option[@value='NY']")).click();
        break;
      case "New_Jersey":
        await driver.findElement(By.xpath("//option[@value='NJ']")).click();
        break;
    }

    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------

    await driver
      .findElement(By.xpath("//input[@name='zipCode']"))
      .sendKeys(ZipCode);

    //petetion description

    await driver
      .findElement(By.xpath("//input[@name='effectiveDate']"))
      .sendKeys(effectiveDate);

    //----------------------------------------------------------------------------------------------------

    switch (departmentName) {
      case "Licenses_and_inspections":
        await driver
          .findElement(
            By.xpath("//*[contains(text(),'Licenses and Inspections')]")
          )
          .click();
        break;
      case "Revenue":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Revenue')][1]"))
          .click();
        break;
      case "Airport":
        await driver
          .findElement(By.xpath("//select[@name='departmentId']/option[2]"))
          .click();
        break;
      case "PPA":
        await driver
          .findElement(
            By.xpath("//*[contains(text(),'Philadelphia Parking Authority')]")
          )
          .click();
        break;
      case "PWD":
        await driver
          .findElement(
            By.xpath("//*[contains(text(),'Philadelphia Water Department')]")
          )
          .click();
        break;
      case "Water_Revenue_Bureau":
        await driver
          .findElement(By.xpath("//*[contains(text(),'Water Revenue Bureau')]"))
          .click();
        break;
    }

    //----------------------------------------------------------------------------------------------------

    await driver
      .findElement(By.xpath("//input[@name='accountNumber']"))
      .sendKeys(accNumber);

    await driver
      .findElement(By.xpath("//input[@id='tb-property-search']"))
      .sendKeys(mailingAddress);

    await driver.findElement(By.xpath("//button[@name='verify']")).click();

    //veryfying address:
    await driver.sleep(5000);
    await driver
      .findElement(By.xpath("//button[normalize-space()='USE THIS ADDRESS']"))
      .click();

    await driver
      .findElement(By.xpath("//label[normalize-space()='Appeal of a bill']"))
      .click();

    await driver
      .findElement(By.xpath("//input[@name='initialBillDate']"))
      .sendKeys(initialBillDate, Key.RETURN);

    //await driver.findElement(By.xpath("//button[@class='button is-secondary has-icon add-disputeperiod']")).click();

    await driver
      .findElement(By.xpath("//input[@name='disputedPeriodStart']"))
      .sendKeys(disputedPeriodStart);

    await driver
      .findElement(By.xpath("//input[@name='disputedPeriodEnd']"))
      .sendKeys(disputedPeriodEnd);

    await driver
      .findElement(By.xpath("//input[@name='principal']"))
      .sendKeys(Key.BACK_SPACE);
    await driver
      .findElement(By.xpath("//input[@name='principal']"))
      .sendKeys(principalamt);

    await driver
      .findElement(By.xpath("//input[@name='interest']"))
      .sendKeys(Key.BACK_SPACE);
    await driver
      .findElement(By.xpath("//input[@name='interest']"))
      .sendKeys(interestamt);

    await driver
      .findElement(By.xpath("//input[@name='penalty']"))
      .sendKeys(Key.BACK_SPACE);
    await driver
      .findElement(By.xpath("//input[@name='penalty']"))
      .sendKeys(penaltyamt);

    console.log(principalamt + interestamt + penaltyamt);

    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    if (principalamt + interestamt + penaltyamt >= 50000) {
      await driver
        .findElement(By.xpath("//label[normalize-space()='Board']"))
        .click();
    } else {
      await driver
        .findElement(By.xpath("//div[normalize-space()='Department']"))
        .click();
    }
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------

    await driver
      .findElement(By.xpath("//textarea[@name='caseDescription']"))
      .sendKeys(caseDescription);

    await driver
      .findElement(By.xpath("//button[normalize-space()='SAVE AND CONTINUE']"))
      .click();

    //your test file is located in the 'helpers' directory
    const filePath = path.join(__dirname, 'helpers', 'Testfile.pdf');

    //fileuploading
    await driver
      .findElement(By.xpath("//input[@name='inputPaperPetitionFile']"))
      .sendKeys(filePath);
    await driver
      .findElement(By.xpath("//input[@name='inputBillFile']"))
      .sendKeys(filePath);

    await driver
      .findElement(By.xpath("//button[normalize-space()='SAVE AND CONTINUE']"))
      .click();

    //Clicking on My options
    await driver
      .findElement(By.xpath("*//input[@name='petitionNotetitle']"))
      .sendKeys(commentTest);

    await driver
      .findElement(By.xpath("*//textarea[@name='petitionNotetext']"))
      .sendKeys(commentTest);

    //case decision action

    switch (caseDecision) {
      case "Approve_Case":
        await driver
          .findElement(By.xpath("*//option[normalize-space()='Approve case']"))
          .click();
        break;
      case "Deny_Case":
        await driver
          .findElement(By.xpath("*//option[normalize-space()='Deny case']"))
          .click();
        break;
      case "Save_as_Incomplete":
        await driver
          .findElement(
            By.xpath("*//option[normalize-space()='Save as incomplete']")
          )
          .click();
        break;
      case "Save_as_nunc_pro_tunc":
        await driver
          .findElement(
            By.xpath("*//option[normalize-space()='Save as nunc pro tunc']")
          )
          .click();
        break;
    }

    //Clicking on submit should create a new petition:

    await driver
      .findElement(By.xpath("//button[normalize-space()='SUBMIT']"))
      .click();

    await driver.sleep(5000);

    await driver.navigate().refresh();

    let docketID = await driver.findElement(
      By.css("div[class='column border-bottom-medium-grey'] p:nth-child(2)")
    );
    let docketNumber = await docketID.getText();
    console.log(docketNumber);

    let currentDate = new Date();
    let hearingDate = new Date();
    hearingDate.setDate(currentDate.getDate() + 1); //---

    let month = hearingDate.getMonth() + 1;
    let day = hearingDate.getDate();
    let year = hearingDate.getFullYear();
    hearingDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;

    //let sessionTime = "1PM"
    let scheduleType = "Hearing";

    await driver
      .findElement(By.xpath("//a[normalize-space()='Scheduler']"))
      .click();
    await driver
      .findElement(By.xpath("//a[normalize-space()='Scheduler']"))
      .sendKeys(Key.TAB);
    await driver
      .findElement(By.xpath("//a[normalize-space()='Scheduler']"))
      .sendKeys(Key.TAB);
    await driver
      .findElement(By.xpath("//a[normalize-space()='Scheduler']"))
      .sendKeys(Key.TAB);
    await driver
      .findElement(
        By.xpath(
          "//div[@class='control is-large']//input[@placeholder='Type keywords']"
        )
      )
      .sendKeys(docketNumber, Key.ENTER);

    await driver.sleep(3000);
    await driver.sleep(5000);
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver
      .findElement(By.xpath("//a[normalize-space()='Schedule']"))
      .click();
    await driver.sleep(5000);
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver
      .findElement(
        By.xpath(
          "//div[@class='control is-large']//input[@placeholder='MM/DD/YYYY']"
        )
      )
      .sendKeys(hearingDate);

    //click to activated that popup screen
    await driver
      .findElement(By.xpath("//div[@class='is-flex content']"))
      .click();

    await driver.sleep(2000);

    switch (scheduleType) {
      case "Hearing":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Hearing']"))
          .click();
        break;
      case "DecisionOnly":
        await driver
          .findElement(
            By.xpath("//select/option[normalize-space()='Decision only']")
          )
          .click();
        break;
      case "Status":
        await driver
          .findElement(By.xpath("//select/option[normalize-space()='Status']"))
          .click();
        break;
    }

    if (principalamt + interestamt + penaltyamt >= 50000) {
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath("//button[normalize-space()='SUBMIT']"))
        .click();
      await driver
        .findElement(
          By.xpath(
            "//label[normalize-space()='I confirm that the information above is correct.']"
          )
        )
        .click();
      await driver
        .findElement(
          By.xpath("//button[normalize-space()='CONFIRM AND SUBMIT']")
        )
        .click();

      await driver.sleep(5000);
    } else {
      await driver
        .findElement(By.xpath("//label[normalize-space()='Morning 10 am']"))
        .click();
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath("//button[normalize-space()='SUBMIT']"))
        .click();
      await driver
        .findElement(
          By.xpath(
            "//label[normalize-space()='I confirm that the information above is correct.']"
          )
        )
        .click();
      await driver
        .findElement(
          By.xpath("//button[normalize-space()='CONFIRM AND SUBMIT']")
        )
        .click();
    }
    await driver.sleep(3000);
    //await driver.quit();
  });
});
