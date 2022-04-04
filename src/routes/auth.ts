import { NextFunction, Request, Response, Router } from "express";
import Student, { StudentInterface } from "../database/models/student";
import validator from "validator";
import { compare, hash } from "bcryptjs";
import generateMultipleAvatars from "../utils/avatar";
import { generateToken, tokenDecoder as tokenDecoderr } from "../utils/jwt";

const AuthRouter = Router();

AuthRouter.post(
  "/signup",
  (req: Request, res: Response, next: NextFunction) => {
    const data: StudentInterface = req.body;
    //   validating data for student's signup
    const errs: string[] = [];

    if (!data.name || !((data.name + "").length >= 4))
      errs.push("Invalid Name");
    if (validator.isEmail(data.name + "")) errs.push("Name cannot be an Email");
    if (!data.email || !validator.isEmail(data.email + ""))
      errs.push("InValid Email");
    if (!data.password || !((data.password + "").length >= 8))
      errs.push("Invalid Password");
    if (!data.grade) errs.push("Invalid Grade");
    if (!(data.subjects.length >= 3)) errs.push("Invalid Subjects");
    if (!data.avatar || !validator.isURL(data.avatar + ""))
      errs.push("Invalid Profile Picture");

    if (errs.length) {
      return res.json({
        success: false,
        message: "missing required fields",
        errors: errs,
      });
    }

    Student.exists({ email: data.email }, (err, exists) => {
      if (err) return next(err);
      if (exists) {
        return res.json({
          success: false,
          message: "Email already exists",
          errors: ["Email already exists"],
        });
      }
      // hashing the password
      hash(data.password, 10)
        .then((hash) => {
          // creating student
          const student = new Student({
            name: data.name,
            email: data.email,
            password: hash,
            avatar: data.avatar || generateMultipleAvatars(1)[0],
            grade: data.grade,
            subjects: data.subjects,
          });

          // saving student
          student
            .save()
            .then((student: StudentInterface) => {
              const token = generateToken(student._id, student.name);
              res.status(200).json({
                success: true,
                message: "student created successfully",
                data: {
                  student,
                  token,
                },
              });
            })
            .catch((err: Error) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    });
  }
);

interface SignInData {
  nameOrEmail: string;
  password: string;
}

AuthRouter.post(
  "/signin",
  (req: Request, res: Response, next: NextFunction) => {
    const data: SignInData = req.body;
    //   validating data for student's signin
    const errs: string[] = [];
    if (!data.nameOrEmail || !((data.nameOrEmail + "").trim().length >= 4))
      errs.push("Invalid Credentials");
    if (!data.password || !((data.password + "").length >= 8))
      errs.push("Invalid Password");

    if (errs.length) {
      return res.json({
        success: false,
        message: "missing required fields",
        errors: errs,
      });
    }
    const isName = !validator.isEmail(data.nameOrEmail + "");
    Student.findOne(
      isName ? { name: data.nameOrEmail } : { email: data.nameOrEmail },
      (err: Error, student: StudentInterface) => {
        if (err) {
          next(err);
        }
        if (!student) {
          return res.json({
            success: false,
            message: "User not found",
            errors: ["User not found"],
          });
        } else {
          // checking if password is correct
          compare(data.password, student.password).then((isMatch) => {
            if (isMatch) {
              const token = generateToken(student._id, student.name);
              res.status(200).json({
                success: true,
                message: "student signed in successfully",
                data: {
                  student,
                  token,
                },
              });
            } else {
              return res.json({
                success: false,
                message: "Wrong Password",
                errors: ["Wrong Password"],
              });
            }
          });
        }
      }
    );
  }
);

AuthRouter.post(
  "/verifytoken",
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
        errors: ["Token not found"],
      });
    }
    const decoded = tokenDecoderr(token);
    if (decoded._id) {
      Student.findById(decoded._id)
        .then((student) => {
          if (student) {
            const newToken = generateToken(student._id, student.name);
            return res.json({
              success: true,
              message: "Token verified successfully",
              data: {
                student,
                token: newToken,
              },
            });
          } else {
            return res.json({
              success: false,
              message: "Token not verified",
              errors: ["Token not verified"],
            });
          }
        })
        .catch(next);
    } else {
      return res.json({
        success: false,
        message: "Token not verified",
        errors: ["Token not verified"],
      });
    }
  }
);

export default AuthRouter;
