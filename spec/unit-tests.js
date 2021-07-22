// const account = require("../src/account-management.ts");
const controller = require("../src/controller")

describe("Test getSingleUser", function () {
    it("should show the user's data", function () {
        expect(controller.findSingleUser).toBeDefined();
        return controller.findSingleUser({ user: 'iyad' }).then(function (data) {
            expect(data).toEqual({
                "firstname": "iyad",
                "name": "callas",
                "destination": "paris"
            });
        })
    });


    it("should show the user's data", function () {
        expect(controller.findSingleUser).toBeDefined();
        return controller.findSingleUser({ user: 'paul' }).then(function (data) {
            expect(data).toEqual({
                "firstname": "paul",
                "name": "le bras",
                "destination": "paris"
            });
        })
    });


    it("should show the user's data", function () {
        expect(controller.findSingleUser).toBeDefined();
        return controller.findSingleUser({ user: 'ranga' }).then(function (data) {
            expect(data).toEqual({
                "firstname": "ranga",
                "name": "jayasuriya",
                "destination": "paris"
            });
        })
    });

    /* it("should show that the user does not exist", function () {
        expect(account.checkAccount).toBeDefined();
        return account.checkAccount({
            "person_id": "20051365537331",
            "birthdate": "1957-05-12",
            "given_name": "CASCA",
            "family_name": "GUTS",
            "nir": "157057511607695"
        }).then(function (data) {
            expect(data).toEqual({ code_http: 200, code: 1001, message: 'Ko : l\'assuré n\'existe pas' });
        })
    });

    it("should show that the user is dead", function () {
        expect(account.checkAccount).toBeDefined();
        return account.checkAccount({
            "person_id": "19358140801300",
            "birthdate": "1930-01-05",
            "given_name": "ALIX",
            "family_name": "MAJOU DE LA DEBUTERIE",
            "nir": "230018614800125"
        }).then(function (data) {
            expect(data).toEqual({ code_http: 200, code: 1002, message: 'Ko : adhérent décédé' });
        })
    }); */
});


describe("Test getSingleUser", function () {
    it("should show the user's data", function () {
        expect(controller.findSingleUser).toBeDefined();
        return controller.findSingleUser({ user: 'iyad' }).then(function (data) {
            expect(data).toEqual({
                "firstname": "iyad",
                "name": "callas",
                "destination": "paris"
            });
        })
    });
});