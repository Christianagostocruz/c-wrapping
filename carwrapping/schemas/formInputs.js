export default {
    name: "formInputs",
    type: "document",
    title: "FormInputs",
    fields:[
        {
            name: "name",
            type: "string",
        },
        {
            title: "Approved",
            name: "approved",
            type: "boolean",
            description: "Formulario enviado, se le enviara la cotización pronto.",
        },
        {
            name: "phone",
            type: "string",
        },
        {
            name: "email",
            type: "string",
        },
        {
            name: "comment",
            type: "text",
        },
        {
            name: "post",
            type: "reference",
            to: [{ type: "post"}]
        },
    ]

}