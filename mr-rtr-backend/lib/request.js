const SystemLog = require("../services/SystemLogService");

const ObjectName = require("../helpers/ObjectName");
const { companyService } = require("../services/CompanyService");
const { Op } = require("sequelize");

class Request {
  static GetCompanyId(req) {
    let companyId = req.user && req.user.company_id;

    if (!companyId) {
      companyId = req.query.companyId;
    }

    return companyId;
  }

  static GetId(req) {
    let id = req.query && req.query.id;
    return id;
  }

  static getUserId(req) {
    let userId = req.user && req.user.id;

    if (!userId) {
      userId = req.query.id;
    }

    return userId;
  }

  static getUserRole(req) {
    let userRole = req.user && req.user.role;

    if (!userRole) {
      userRole = req.query.role;
    }

    return userRole;
  }
  //
  /**
   * Get IP Address
   *
   * @param req
   */
  static GetIPAddress(req) {
    return req.connection.remoteAddress.replace(/^.*:/, "");
  }

  static getIpAddress(req, res) {
    let ipAddress =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.headers["cf-connecting-ip"] ||
      req.connection.remoteAddress;

    // Remove any leading "ffff:" from IPv4-mapped IPv6 addresses
    ipAddress = ipAddress.replace(/^::ffff:/, "");

    res.on("finish", async () => {
      SystemLog.create(`User IP Address Is ${ipAddress}`, req, ObjectName.USER, req && req.user && req.user.id);
    });
    return ipAddress;
  }

  static async GetCompanyIdBasedUrl(baseUrl) {
    const companyDetails = await companyService.findOne({
      where: { portal_url: { [Op.iLike]: baseUrl } },
    });
    if (companyDetails) {
      return companyDetails && companyDetails?.id;
    }
    return companyDetails;
  }
}

module.exports = Request;
