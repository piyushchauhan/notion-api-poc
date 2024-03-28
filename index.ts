import { Client } from "@notionhq/client"
import { config } from "dotenv"

const apiKey = process.env.NOTION_KEY
const trackerPageId =
    // 'cc648bbfb4004c798985ed1e74d074f1' Hello test page
    '6184a1ba07c246cdacaec8f448fe51fe' // Applicaiton Tracker

const trackerDatabaseId = '6184a1ba07c246cdacaec8f448fe51fe'
const notion = new Client({ auth: apiKey })

console.log("Hello via Bun!");

async function addNotionPageToDatabase(databaseId: string, pageProperties: any) {
    const newPage = await notion.pages.create({
        parent: {
            database_id: databaseId,
        },
        properties: pageProperties,
    })
    return newPage
}

const lastOrderedIn2023 = await notion.databases.query({
    database_id: trackerDatabaseId,
})
const newPage = await addNotionPageToDatabase(trackerDatabaseId, {
    'Company': {
        type: "title",
        title: [{ type: "text", text: { content: "AbC" } }],
    }
})
console.log(newPage)
console.log(lastOrderedIn2023.results)
// const blockId = trackerPageId // Blocks can be appended to other blocks *or* pages. Therefore, a page ID can be used for the block_id parameter
// const newHeadingResponse = await notion.blocks.children.append({
//     block_id: blockId,
//     // Pass an array of blocks to append to the page: https://developers.notion.com/reference/block#block-type-objects
//     children: [
//         {
//             heading_2: {
//                 rich_text: [
//                     {
//                         text: {
//                             content: "Types of kale", // This is the text that will be displayed in Notion
//                         },
//                     },
//                 ],
//             },
//         },
//     ],
// })

// // Print the new block(s) response
// console.log(newHeadingResponse)
