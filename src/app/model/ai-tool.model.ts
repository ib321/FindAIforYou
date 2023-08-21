export class AiTool {
  pricingModel: string;
  imageLink: string;
  name: string;
  shortDesc: string;
  description?: string;
  redirectLink: string;
  tags: string[];

  constructor(
    pricingModel: string,
    imageLink: string,
    name: string,
    shortDesc: string,
    redirectLink: string,
    tags: string[],
    description?: string
  ) {
    this.pricingModel = pricingModel;
    this.imageLink = imageLink;
    this.name = name;
    this.shortDesc = shortDesc;
    this.redirectLink = redirectLink;
    this.tags = tags;
    this.description = description;
  }
}