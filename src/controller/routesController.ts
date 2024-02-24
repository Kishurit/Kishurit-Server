import { NextFunction, Request, Response } from "express";
import { SubCatModel, SubCategory } from "../models/subCategories.model";

const verifyData = (data: any, res: Response, next: NextFunction): void => {
  !data ? next() : res.json(data);
};

export const findCollection = async (req: Request, res: Response, next: NextFunction) => {
    // type Data = {
  //   total: number;
  //   cat: { name: string; totNum: number }[];
  // };

  // const data = jsonDB.job.reduce(
  //   (acc: Data, element: Categorie) => {
  //     const totalCatNum = element.links.reduce(
  //       (acc1, element1) => acc1 + element1.links.length,
  //       0
  //     );
  //     acc.total += totalCatNum;
  //     acc.cat.push({ name: element.name, totNum: totalCatNum });
  //     return acc;
  //   },
  //   { total: 0, cat: [] }
  // );
 
  try {
    // const result = await OrgsModel.aggregate([
    //   {
    //     $group: {
    //       _id: '$subCatRefId', // Group by catRefId
    //       count: { $sum: 1 } // Count occurrences
    //     }
    //   }
    // ]);

    //const result1 =  (await CategoryModel.find()).filter (cat => cat.name);
    const result = (await SubCatModel.find().populate('catRefId')).reduce(
      (acc: Record<string, string[]>, cur: SubCategory) => {
        const categoryName = cur.catRefId.name; // This should work now
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(cur.name);
        return acc;
      },
      {}
    );
    
    
    // console.log (result)
    verifyData(result, res, next);

  } catch (error) {
    // Handle errors
    console.error('Error counting documents:', error);
    throw error;
  }
}