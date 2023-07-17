const { Builder, until, By } = require("selenium-webdriver");

const webSerarch = async () => {
  const driver = new Builder().forBrowser("chrome").build();
  driver.manage().window().maximize();
  await driver.get("https://www.amazon.in/");
  await driver
    .wait(
      until.elementLocated(By.xpath("//*[@id='twotabsearchtextbox']")),
      2000
    )
    .sendKeys("macbook air m1");
  await driver.sleep(2000);
  await driver
    .wait(
      until.elementLocated(By.xpath("//*[@id='nav-search-submit-button']")),
      2000
    )
    .click();
  await driver.sleep(2000);
  await driver
    .wait(
      until.elementLocated(
        By.xpath(
          "//*[@id='search']/div[1]/div[1]/div/span[1]/div[1]/div[5]/div/div/div/div/div/div[2]/div/div/div[1]/h2/a/span"
        )
      ),
      2000
    )
    .click();
  await driver.sleep(2000);

  const tabs = await driver.getAllWindowHandles();
  await driver.switchTo().window(tabs[1]);

  const priceElement = await driver.findElement(
    By.xpath(
      "//*[@id='corePriceDisplay_desktop_feature_div']/div[1]/span[2]/span[2]/span[2]"
    )
  );
  const text = await priceElement.getText();
  console.log("Todays price:", text);

  const sellerElement = await driver.findElement(
    By.xpath("//*[@id='bylineInfo']")
  );
  let seller = await sellerElement.getText();
  const textToRemove = "Visit the ";
  seller = seller.replace(textToRemove, "");
  console.log("Sellers Name:", seller);

  const detailElement = await driver.findElement(
    By.xpath("//*[@id='poExpander']/div[1]/div/table/tbody")
  );
  const productDetail = await detailElement.getText();
  console.log("Product Detail:", productDetail);
};

webSerarch();
