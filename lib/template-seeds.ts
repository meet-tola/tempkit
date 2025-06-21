// Prebuilt template content in Tiptap JSON format
export const prebuiltTemplates = [
  {
    name: "Creative Project Proposal",
    description: "Professional proposal template for creative projects with scope, timeline, and pricing sections",
    category: "PROPOSAL",
    thumbnail: "/templates/creative-proposal.png",
    tags: ["creative", "proposal", "professional"],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Creative Project Proposal" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Prepared for: " },
            { type: "text", marks: [{ type: "bold" }], text: "[Client Name]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Date: " },
            { type: "text", marks: [{ type: "bold" }], text: "[Date]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Project: " },
            { type: "text", marks: [{ type: "bold" }], text: "[Project Name]" },
          ],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Project Overview" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We are excited to present this proposal for [Project Name]. This document outlines our understanding of your requirements, our proposed approach, timeline, and investment details.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Scope of Work" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 1 - e.g., Brand Identity Design]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 2 - e.g., Website Design & Development]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 3 - e.g., Marketing Materials]" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Timeline" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Phase 1: Discovery & Strategy" },
            { type: "text", text: " - [Duration, e.g., 1-2 weeks]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Phase 2: Design & Development" },
            { type: "text", text: " - [Duration, e.g., 3-4 weeks]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Phase 3: Review & Finalization" },
            { type: "text", text: " - [Duration, e.g., 1 week]" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Investment" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Total Project Investment: " },
            { type: "text", marks: [{ type: "bold" }], text: "$[Amount]" },
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Payment Terms: [e.g., 50% upfront, 50% upon completion]" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Next Steps" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We're excited to work with you on this project. To proceed, please review this proposal and let us know if you have any questions. Once approved, we'll send over the contract and begin immediately.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Photography Service Contract",
    description: "Comprehensive contract template for photography services including usage rights and terms",
    category: "CONTRACT",
    thumbnail: "/templates/photography-contract.png",
    tags: ["photography", "contract", "legal"],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Photography Service Agreement" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "This agreement is between " },
            { type: "text", marks: [{ type: "bold" }], text: "[Photographer Name]" },
            { type: "text", text: ' ("Photographer") and ' },
            { type: "text", marks: [{ type: "bold" }], text: "[Client Name]" },
            { type: "text", text: ' ("Client") for photography services.' },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Event Details" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Event: " },
            { type: "text", text: "[Event Type]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Date: " },
            { type: "text", text: "[Event Date]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Time: " },
            { type: "text", text: "[Start Time] - [End Time]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Location: " },
            { type: "text", text: "[Venue Address]" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Services Included" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Number] hours of photography coverage" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Professional editing of [Number] final images" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Online gallery for viewing and downloading" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Delivery within [Number] weeks of event date" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Payment Terms" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Total Fee: " },
            { type: "text", text: "$[Amount]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Payment Schedule: [e.g., $500 retainer due upon signing, remaining balance due on event date]",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Usage Rights" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Client receives full usage rights for personal use. Commercial usage requires separate licensing agreement. Photographer retains copyright and may use images for portfolio and marketing purposes.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Cancellation Policy" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cancellations made more than 30 days before the event: Full refund minus $100 administrative fee. Cancellations made 15-30 days before: 50% refund. Cancellations made less than 15 days before: No refund.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Professional Invoice",
    description: "Clean and professional invoice template with itemized services and payment terms",
    category: "INVOICE",
    thumbnail: "/templates/professional-invoice.png",
    tags: ["invoice", "billing", "professional"],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "INVOICE" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Invoice #: " },
            { type: "text", text: "[Invoice Number]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Date: " },
            { type: "text", text: "[Invoice Date]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Due Date: " },
            { type: "text", text: "[Due Date]" },
          ],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Bill To:" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "[Client Name]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "[Client Address]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "[City, State ZIP]" }],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Services Provided:" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "[Service 1]" },
            { type: "text", text: " - $[Amount]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "[Service 2]" },
            { type: "text", text: " - $[Amount]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "[Service 3]" },
            { type: "text", text: " - $[Amount]" },
          ],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "Subtotal: $[Subtotal]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "Tax ([Rate]%): $[Tax Amount]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "TOTAL: $[Total Amount]" }],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Payment Information:" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Payment is due within [Number] days of invoice date. Please remit payment to:" },
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "[Payment Instructions - Bank details, PayPal, etc.]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Thank you for your business!" }],
        },
      ],
    },
  },
  {
    name: "Non-Disclosure Agreement",
    description: "Standard NDA template to protect confidential information in client relationships",
    category: "NDA",
    thumbnail: "/templates/nda-template.png",
    tags: ["nda", "legal", "confidentiality"],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "NON-DISCLOSURE AGREEMENT" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: 'This Non-Disclosure Agreement ("Agreement") is entered into on ' },
            { type: "text", marks: [{ type: "bold" }], text: "[Date]" },
            { type: "text", text: " between " },
            { type: "text", marks: [{ type: "bold" }], text: "[Your Company Name]" },
            { type: "text", text: ' ("Disclosing Party") and ' },
            { type: "text", marks: [{ type: "bold" }], text: "[Client Name]" },
            { type: "text", text: ' ("Receiving Party").' },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1. Definition of Confidential Information" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Confidential Information includes all non-public, proprietary information disclosed by either party, including but not limited to business plans, client lists, financial information, creative concepts, designs, and any other information marked as confidential.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2. Obligations" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "The Receiving Party agrees to:" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Keep all Confidential Information strictly confidential" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Not disclose Confidential Information to third parties" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use Confidential Information solely for the purpose of evaluating potential business relationship",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3. Term" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "This Agreement shall remain in effect for " },
            { type: "text", marks: [{ type: "bold" }], text: "[Duration, e.g., 2 years]" },
            { type: "text", text: " from the date of signing, unless terminated earlier by mutual agreement." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "4. Return of Information" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Upon termination of this Agreement, the Receiving Party shall return or destroy all Confidential Information and any copies thereof.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Signatures" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "Disclosing Party:" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Signature: _________________________" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Name: [Your Name]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Date: _____________" }],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "Receiving Party:" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Signature: _________________________" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Name: [Client Name]" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Date: _____________" }],
        },
      ],
    },
  },
  {
    name: "Project Brief Template",
    description: "Comprehensive project brief to capture requirements, goals, and specifications",
    category: "BRIEF",
    thumbnail: "/templates/project-brief.png",
    tags: ["brief", "project", "requirements"],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Project Brief" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Project Name: " },
            { type: "text", text: "[Project Name]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Client: " },
            { type: "text", text: "[Client Name]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Date: " },
            { type: "text", text: "[Date]" },
          ],
        },
        { type: "paragraph", content: [{ type: "text", text: "" }] },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Project Overview" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "[Provide a brief description of the project, its purpose, and main objectives]" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Goals & Objectives" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Primary goal/objective]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Secondary goal/objective]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Additional goal/objective]" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Target Audience" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "[Describe the target audience, demographics, and user personas]" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Scope & Deliverables" }],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 1]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 2]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Deliverable 3]" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Timeline & Milestones" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Project Start: " },
            { type: "text", text: "[Start Date]" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Project End: " },
            { type: "text", text: "[End Date]" },
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", marks: [{ type: "bold" }], text: "Key Milestones:" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Milestone 1] - [Date]" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "[Milestone 2] - [Date]" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Budget" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Total Budget: " },
            { type: "text", text: "$[Amount]" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Success Metrics" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "[Define how success will be measured for this project]" }],
        },
      ],
    },
  },
]
