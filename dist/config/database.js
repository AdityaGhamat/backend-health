"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serverconfig_1 = __importDefault(require("./serverconfig"));
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!serverconfig_1.default.DATABASE_URL) {
                throw new Error("Database url is not provided");
            }
            mongoose_1.default
                .connect(serverconfig_1.default.DATABASE_URL)
                .then(() => console.log("databse is connected"))
                .catch((e) => {
                throw new Error("Failed to connect to database");
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.default = connectDatabase;
