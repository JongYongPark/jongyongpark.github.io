 # Claude prompting guide

## General tips for effective prompting

### 1. Be clear and specific
   - Clearly state your task or question at the beginning of your message.
   - Provide context and details to help Claude understand your needs.
   - Break complex tasks into smaller, manageable steps.

   Bad prompt:
   <prompt>
   "Help me with a presentation."
   </prompt>

   Good prompt:
   <prompt>
   "I need help creating a 10-slide presentation for our quarterly sales meeting. The presentation should cover our Q2 sales performance, top-selling products, and sales targets for Q3. Please provide an outline with key points for each slide."
   </prompt>

   Why it's better: The good prompt provides specific details about the task, including the number of slides, the purpose of the presentation, and the key topics to be covered.

### 2. Use examples
   - Provide examples of the kind of output you're looking for.
   - If you want a specific format or style, show Claude an example.

   Bad prompt:
   <prompt>
   "Write a professional email."
   </prompt>

   Good prompt:
   <prompt>
   "I need to write a professional email to a client about a project delay. Here's a similar email I've sent before:

   'Dear [Client],
   I hope this email finds you well. I wanted to update you on the progress of [Project Name]. Unfortunately, we've encountered an unexpected issue that will delay our completion date by approximately two weeks. We're working diligently to resolve this and will keep you updated on our progress.
   Please let me know if you have any questions or concerns.
   Best regards,
   [Your Name]'

   Help me draft a new email following a similar tone and structure, but for our current situation where we're delayed by a month due to supply chain issues."
   </prompt>

   Why it's better: The good prompt provides a concrete example of the desired style and tone, giving Claude a clear reference point for the new email.

### 3. Encourage thinking
   - For complex tasks, ask Claude to "think step-by-step" or "explain your reasoning."
   - This can lead to more accurate and detailed responses.

   Bad prompt:
   <prompt>
   "How can I improve team productivity?"
   </prompt>

   Good prompt:
   <prompt>
   "I'm looking to improve my team's productivity. Think through this step-by-step, considering the following factors:
   1. Current productivity blockers (e.g., too many meetings, unclear priorities)
   2. Potential solutions (e.g., time management techniques, project management tools)
   3. Implementation challenges
   4. Methods to measure improvement

   For each step, please provide a brief explanation of your reasoning. Then summarize your ideas at the end."
   </prompt>

   Why it's better: The good prompt asks Claude to think through the problem systematically, providing a guided structure for the response and asking for explanations of the reasoning process. It also prompts Claude to create a summary at the end for easier reading.

### 4. Iterative refinement
   - If Claude's first response isn't quite right, ask for clarifications or modifications.
   - You can always say "That's close, but can you adjust X to be more like Y?"

   Bad prompt:
   <prompt>
   "Make it better."
   </prompt>

   Good prompt:
   <prompt>
   "That’s a good start, but please refine it further. Make the following adjustments:
   1. Make the tone more casual and friendly
   2. Add a specific example of how our product has helped a customer
   3. Shorten the second paragraph to focus more on the benefits rather than the features"
   </prompt>

   Why it's better: The good prompt provides specific feedback and clear instructions for improvements, allowing Claude to make targeted adjustments instead of just relying on Claude’s innate sense of what “better” might be — which is likely different from the user’s definition!

### 5. Leverage Claude's knowledge
   - Claude has broad knowledge across many fields. Don't hesitate to ask for explanations or background information
   - Be sure to include relevant context and details so that Claude’s response is maximally targeted to be helpful

   Bad prompt:
   <prompt>
   "What is marketing? How do I do it?"
   </prompt>

   Good prompt:
   <prompt>
   "I'm developing a marketing strategy for a new eco-friendly cleaning product line. Can you provide an overview of current trends in green marketing? Please include:
   1. Key messaging strategies that resonate with environmentally conscious consumers
   2. Effective channels for reaching this audience
   3. Examples of successful green marketing campaigns from the past year
   4. Potential pitfalls to avoid (e.g., greenwashing accusations)

   This information will help me shape our marketing approach."
   </prompt>

   Why it's better: The good prompt asks for specific, contextually relevant  information that leverages Claude's broad knowledge base. It provides context for how the information will be used, which helps Claude frame its answer in the most relevant way.

### 6. Use role-playing
   - Ask Claude to adopt a specific role or perspective when responding.

   Bad prompt:
   <prompt>
   "Help me prepare for a negotiation."
   </prompt>

   Good prompt:
   <prompt>
   "You are a fabric supplier for my backpack manufacturing company. I'm preparing for a negotiation with this supplier to reduce prices by 10%. As the supplier, please provide:
   1. Three potential objections to our request for a price reduction
   2. For each objection, suggest a counterargument from my perspective
   3. Two alternative proposals the supplier might offer instead of a straight price cut

   Then, switch roles and provide advice on how I, as the buyer, can best approach this negotiation to achieve our goal."
   </prompt>

   Why it's better: This prompt uses role-playing to explore multiple perspectives of the negotiation, providing a more comprehensive preparation. Role-playing also encourages Claude to more readily adopt the nuances of specific perspectives, increasing the intelligence and performance of Claude’s response.


## Task-specific tips and examples

### Content Creation

1. **Specify your audience**
   - Tell Claude who the content is for.

   Bad prompt:
   <prompt>
   "Write something about cybersecurity."
   </prompt>

   Good prompt:
   <prompt>
   "I need to write a blog post about cybersecurity best practices for small business owners. The audience is not very tech-savvy, so the content should be:
   1. Easy to understand, avoiding technical jargon where possible
   2. Practical, with actionable tips they can implement quickly
   3. Engaging and slightly humorous to keep their interest

   Please provide an outline for a 1000-word blog post that covers the top 5 cybersecurity practices these business owners should adopt."
   </prompt>

   Why it's better: The good prompt specifies the audience, desired tone, and key characteristics of the content, giving Claude clear guidelines for creating appropriate and effective output.

2. **Define the tone and style**
   - Describe the desired tone.
   - If you have a style guide, mention key points from it.

   Bad prompt:
   <prompt>
   "Write a product description."
   </prompt>

   Good prompt:
   <prompt>
   "Please help me write a product description for our new ergonomic office chair. Use a professional but engaging tone. Our brand voice is friendly, innovative, and health-conscious. The description should:
   1. Highlight the chair's key ergonomic features
   2. Explain how these features benefit the user's health and productivity
   3. Include a brief mention of the sustainable materials used
   4. End with a call-to-action encouraging readers to try the chair

   Aim for about 200 words."
   </prompt>

   Why it's better: This prompt provides clear guidance on the tone, style, and specific elements to include in the product description.

3. **Define output structure**
   - Provide a basic outline or list of points you want covered.

   Bad prompt:
   <prompt>
   "Create a presentation on our company results."
   </prompt>

   Good prompt:
   <prompt>
   "I need to create a presentation on our Q2 results. Structure this with the following sections:
   1. Overview
   2. Sales Performance
   3. Customer Acquisition
   4. Challenges
   5. Q3 Outlook

   For each section, suggest 3-4 key points to cover, based on typical business presentations. Also, recommend one type of data visualization (e.g., graph, chart) that would be effective for each section."
   </prompt>

   Why it's better: This prompt provides a clear structure and asks for specific elements (key points and data visualizations) for each section.

### Document summary and Q&A

1. **Be specific about what you want**
   - Ask for a summary of specific aspects or sections of the document.
   - Frame your questions clearly and directly.
   - Be sure to specify what kind of summary (output structure, content type) you want

2. **Use the document names**
   - Refer to attached documents by name.

3. **Ask for citations**
   - Request that Claude cites specific parts of the document in its answers.

Here is an example that combines all three of the above techniques:

   Bad prompt:
   <prompt>
   "Summarize this report for me."
   </prompt>

   Good prompt:
   <prompt>
   "I've attached a 50-page market research report called 'Tech Industry Trends 2023'. Can you provide a 2-paragraph summary focusing on AI and machine learning trends? Then, please answer these questions:
   1. What are the top 3 AI applications in business for this year?
   2. How is machine learning impacting job roles in the tech industry?
   3. What potential risks or challenges does the report mention regarding AI adoption?

   Please cite specific sections or page numbers when answering these questions."
   </prompt>

   Why it's better: This prompt specifies the exact focus of the summary, provides specific questions, and asks for citations, ensuring a more targeted and useful response. It also indicates the ideal summary output structure, such as limiting the response to 2 paragraphs.

### Data analysis and visualization

1. **Specify the desired format**
   - Clearly describe the format you want the data in.

   Bad prompt:
   <prompt>
   "Analyze our sales data."
   </prompt>

   Good prompt:
   <prompt>
   "I've attached a spreadsheet called 'Sales Data 2023'. Can you analyze this data and present the key findings in the following format:

   1. Executive Summary (2-3 sentences)

   2. Key Metrics:
      - Total sales for each quarter
      - Top-performing product category
      - Highest growth region

   3. Trends:
      - List 3 notable trends, each with a brief explanation

   4. Recommendations:
      - Provide 3 data-driven recommendations, each with a brief rationale

   After the analysis, suggest three types of data visualizations that would effectively communicate these findings."
   </prompt>

   Why it's better: This prompt provides a clear structure for the analysis, specifies key metrics to focus on, and asks for recommendations and visualization suggestions for further formatting.

### Brainstorming
 1. Use Claude to generate ideas by asking for a list of possibilities or alternatives.
     - Be specific about what topics you want Claude to cover in its brainstorming

   Bad prompt:
   <prompt>
   "Give me some team-building ideas."
   </prompt>

   Good prompt:
   <prompt>
   "We need to come up with team-building activities for our remote team of 20 people. Can you help me brainstorm by:
   1. Suggesting 10 virtual team-building activities that promote collaboration
   2. For each activity, briefly explain how it fosters teamwork
   3. Indicate which activities are best for:
      a) Ice-breakers
      b) Improving communication
      c) Problem-solving skills
   4. Suggest one low-cost option and one premium option."
   </prompt>

   Why it's better: This prompt provides specific parameters for the brainstorming session, including the number of ideas, type of activities, and additional categorization, resulting in a more structured and useful output.

2. Request responses in specific formats like bullet points, numbered lists, or tables for easier reading.

   Bad Prompt:
   <prompt>
   "Compare project management software options."
   </prompt>

   Good Prompt:
   <prompt>
   "We're considering three different project management software options: Asana, Trello, and Microsoft Project. Can you compare these in a table format using the following criteria:
   1. Key Features
   2. Ease of Use
   3. Scalability
   4. Pricing (include specific plans if possible)
   5. Integration capabilities
   6. Best suited for (e.g., small teams, enterprise, specific industries)"
   </prompt>

   Why it's better: This prompt requests a specific structure (table) for the comparison, provides clear criteria, making the information easy to understand and apply.
  
## Troubleshooting, minimizing hallucinations, and maximizing performance

1. **Allow Claude to acknowledge uncertainty**
   - Tell Claude that it should say it doesn’t know if it doesn’t know. Ex. “If you're unsure about something, it's okay to admit it. Just say you don’t know.”

2. **Break down complex tasks**
   - If a task seems too large and Claude is missing steps or not performing certain steps well, break it into smaller steps and work through them with Claude one message at a time.

3. **Include all contextual information for new requests**
   - Claude doesn't retain information from previous conversations, so include all necessary context in each new conversation.

## Example good vs. bad prompt examples

These are more examples that combine multiple prompting techniques to showcase the stark difference between ineffective and highly effective prompts.

### Example 1: Marketing strategy development

Bad prompt:
<prompt>
"Help me create a marketing strategy."
</prompt>

Good prompt:
<prompt>
"As a senior marketing consultant, I need your help developing a comprehensive marketing strategy for our new eco-friendly smartphone accessory line. Our target audience is environmentally conscious millennials and Gen Z consumers. Please provide a detailed strategy that includes:

1. Market Analysis:
   - Current trends in eco-friendly tech accessories
   - 2-3 key competitors and their strategies
   - Potential market size and growth projections

2. Target Audience Persona:
   - Detailed description of our ideal customer
   - Their pain points and how our products solve them

3. Marketing Mix:
   - Product: Key features to highlight
   - Price: Suggested pricing strategy with rationale
   - Place: Recommended distribution channels
   - Promotion: 
     a) 5 marketing channels to focus on, with pros and cons for each
     b) 3 creative campaign ideas for launch

4. Content Strategy:
   - 5 content themes that would resonate with our audience
   - Suggested content types (e.g., blog posts, videos, infographics)

5. KPIs and Measurement:
   - 5 key metrics to track
   - Suggested tools for measuring these metrics

Please present this information in a structured format with headings and bullet points. Where relevant, explain your reasoning or provide brief examples.

After outlining the strategy, please identify any potential challenges or risks we should be aware of, and suggest mitigation strategies for each."
</prompt>

Why it's better: This prompt combines multiple techniques including role assignment, specific task breakdown, structured output request, brainstorming (for campaign ideas and content themes), and asking for explanations. It provides clear guidelines while allowing room for Claude's analysis and creativity.

### Example 2: Financial report analysis

Bad prompt:
<prompt>
"Analyze this financial report."
</prompt>

Good prompt:
<prompt>
"I've attached our company's Q2 financial report titled 'Q2_2023_Financial_Report.pdf'. Act as a seasoned CFO and analyze this report and prepare a briefing for our board of directors. Please structure your analysis as follows:

1. Executive Summary (3-4 sentences highlighting key points)

2. Financial Performance Overview:
   a) Revenue: Compare to previous quarter and same quarter last year
   b) Profit margins: Gross and Net, with explanations for any significant changes
   c) Cash flow: Highlight any concerns or positive developments

3. Key Performance Indicators:
   - List our top 5 KPIs and their current status (Use a table format)
   - For each KPI, provide a brief explanation of its significance and any notable trends

4. Segment Analysis:
   - Break down performance by our three main business segments
   - Identify the best and worst performing segments, with potential reasons for their performance

5. Balance Sheet Review:
   - Highlight any significant changes in assets, liabilities, or equity
   - Calculate and interpret key ratios (e.g., current ratio, debt-to-equity)

6. Forward-Looking Statements:
   - Based on this data, provide 3 key predictions for Q3
   - Suggest 2-3 strategic moves we should consider to improve our financial position

7. Risk Assessment:
   - Identify 3 potential financial risks based on this report
   - Propose mitigation strategies for each risk

8. Peer Comparison:
   - Compare our performance to 2-3 key competitors (use publicly available data)
   - Highlight areas where we're outperforming and areas for improvement

Please use charts or tables where appropriate to visualize data. For any assumptions or interpretations you make, please clearly state them and provide your reasoning.

After completing the analysis, please generate 5 potential questions that board members might ask about this report, along with suggested responses.

Finally, summarize this entire analysis into a single paragraph that I can use as an opening statement in the board meeting."
</prompt>

Why it's better: This prompt combines role-playing (as CFO), structured output, specific data analysis requests, predictive analysis, risk assessment, comparative analysis, and even anticipates follow-up questions. It provides a clear framework while encouraging deep analysis and strategic thinking.


# Claude 프롬프팅 가이드

## 효과적인 프롬프트 작성을 위한 일반적인 팁

### 1. 명확하고 구체적으로 작성하기
   - 메시지 시작 부분에 작업이나 질문을 명확하게 기술하세요.
   - Claude가 필요사항을 이해할 수 있도록 맥락과 세부 정보를 제공하세요.
   - 복잡한 작업은 작은 단계로 나누어 관리하기 쉽게 만드세요.

   나쁜 프롬프트:
   <prompt>
   "프레젠테이션 작성을 도와주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "분기별 영업 회의를 위한 10장 분량의 프레젠테이션 작성을 도와주세요. 프레젠테이션은 2분기 영업 실적, 최고 판매 제품, 3분기 영업 목표를 다루어야 합니다. 각 슬라이드의 핵심 포인트를 담은 개요를 제공해 주세요."
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 슬라이드 수, 프레젠테이션의 목적, 다루어야 할 핵심 주제 등 작업에 대한 구체적인 세부 정보를 제공합니다.

### 2. 예시 사용하기
   - 원하는 결과물의 종류에 대한 예시를 제공하세요.
   - 특정 형식이나 스타일을 원한다면 Claude에게 예시를 보여주세요.

   나쁜 프롬프트:
   <prompt>
   "전문적인 이메일을 작성해주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "프로젝트 지연에 관해 클라이언트에게 보낼 전문적인 이메일을 작성해야 합니다. 이전에 보낸 유사한 이메일은 다음과 같습니다:

   '친애하는 [클라이언트]님,
   안녕하세요. [프로젝트명]의 진행 상황을 알려드리고자 합니다. 유감스럽게도 예상치 못한 문제가 발생하여 완료 일정이 약 2주 지연될 예정입니다. 저희는 이 문제를 해결하기 위해 열심히 노력하고 있으며 진행 상황을 계속 알려드리겠습니다.
   질문이나 우려 사항이 있으시면 알려주세요.
   감사합니다,
   [이름]'

   비슷한 어조와 구조를 따르되, 공급망 문제로 인해 1개월 지연되는 현재 상황에 맞는 새 이메일을 작성하는 데 도움을 주세요."
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 원하는 스타일과 어조의 구체적인 예시를 제공하여 Claude가 새 이메일을 작성할 때 명확한 참조점을 갖게 합니다.

### 3. 단계적 사고 권장하기
   - 복잡한 작업에서는 Claude에게 "단계별로 생각하세요" 또는 "당신의 추론을 설명하세요"라고 요청하세요.
   - 이를 통해 더 정확하고 상세한 답변을 얻을 수 있습니다.

   나쁜 프롬프트:
   <prompt>
   "팀 생산성을 향상시키는 방법은 무엇인가요?"
   </prompt>

   좋은 프롬프트:
   <prompt>
   "팀의 생산성을 향상시키려고 합니다. 다음 요소들을 고려하여 단계별로 생각해 주세요:
   1. 현재 생산성 저해 요소(예: 너무 많은 회의, 불명확한 우선순위)
   2. 잠재적 해결책(예: 시간 관리 기술, 프로젝트 관리 도구)
   3. 실행 과정의 어려움
   4. 개선을 측정하는 방법

   각 단계에 대해 당신의 추론 과정에 대한 간략한 설명을 제공해 주세요. 그리고 마지막에 아이디어를 요약해 주세요."
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 Claude에게 문제를 체계적으로 생각하도록 요청하고, 응답에 대한 안내된 구조를 제공하며, 추론 과정에 대한 설명을 요청합니다. 또한 쉽게 읽을 수 있도록 마지막에 요약을 작성하도록 요청합니다.

### 4. 반복적 개선
   - Claude의 첫 번째 응답이 정확하지 않다면, 명확한 설명이나 수정을 요청하세요.
   - "그것이 가깝긴 하지만, X를 Y와 더 비슷하게 조정할 수 있나요?"라고 말할 수 있습니다.

   나쁜 프롬프트:
   <prompt>
   "더 좋게 만들어주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "좋은 시작이지만, 더 개선해 주세요. 다음과 같이 조정해 주세요:
   1. 어조를 더 캐주얼하고 친근하게 만들기
   2. 우리 제품이 고객에게 어떻게 도움이 되었는지에 대한 구체적인 예를 추가하기
   3. 두 번째 단락을 줄여서 기능보다 혜택에 더 초점을 맞추기"
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 구체적인 피드백과 개선을 위한 명확한 지침을 제공하여 Claude가 단순히 Claude 자체의 "더 좋음"에 대한 정의에 의존하는 대신(이는 사용자의 정의와 다를 수 있음) 목표로 하는 조정을 할 수 있게 합니다.

### 5. Claude의 지식 활용하기
   - Claude는 다양한 분야에 걸쳐 광범위한 지식을 보유하고 있습니다. 설명이나 배경 정보를 주저하지 말고 요청하세요.
   - Claude의 응답이 최대한 도움이 되도록 관련 맥락과 세부 정보를 포함하세요.

   나쁜 프롬프트:
   <prompt>
   "마케팅이란 무엇인가요? 어떻게 해야 하나요?"
   </prompt>

   좋은 프롬프트:
   <prompt>
   "새로운 친환경 청소 제품 라인을 위한 마케팅 전략을 개발하고 있습니다. 친환경 마케팅의 현재 트렌드에 대한 개요를 제공해 주실 수 있나요? 다음 내용을 포함해 주세요:
   1. 환경 의식이 있는 소비자에게 공감을 얻는 핵심 메시징 전략
   2. 이 대상에게 다가가는 효과적인 채널
   3. 지난 해 성공적인 친환경 마케팅 캠페인 사례
   4. 피해야 할 잠재적 함정(예: 그린워싱 비난)

   이 정보는 우리의 마케팅 접근 방식을 구체화하는 데 도움이 될 것입니다."
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 Claude의 광범위한 지식 기반을 활용하는 구체적이고 맥락적으로 관련된 정보를 요청합니다. 정보가 어떻게 사용될 것인지에 대한 맥락을 제공하여 Claude가 가장 관련성 있는 방식으로 답변을 구성하는 데 도움이 됩니다.

### 6. 역할극 활용하기
   - Claude에게 응답할 때 특정 역할이나 관점을 채택하도록 요청하세요.

   나쁜 프롬프트:
   <prompt>
   "협상 준비를 도와주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "당신은 내 백팩 제조 회사의 원단 공급업체입니다. 가격을 10% 낮추기 위해 이 공급업체와의 협상을 준비하고 있습니다. 공급업체로서 다음을 제공해 주세요:
   1. 가격 인하 요청에 대한 세 가지 잠재적 반대 의견
   2. 각 반대 의견에 대해, 내 관점에서의 반론 제안
   3. 단순한 가격 인하 대신 공급업체가 제안할 수 있는 두 가지 대안적 제안

   그런 다음, 역할을 바꿔서 구매자인 내가 목표를 달성하기 위해 이 협상에 어떻게 접근하는 것이 가장 좋을지에 대한 조언을 제공해 주세요."
   </prompt>

   더 좋은 이유: 이 프롬프트는 역할극을 사용하여 협상의 여러 관점을 탐색하여 더 포괄적인 준비를 제공합니다. 역할극은 또한 Claude가 특정 관점의 뉘앙스를 더 쉽게 채택하도록 장려하여 Claude 응답의 지능과 성능을 향상시킵니다.


## 작업별 팁과 예시

### 콘텐츠 작성

1. **대상 청중 명시하기**
   - 콘텐츠가 누구를 위한 것인지 Claude에게 알려주세요.

   나쁜 프롬프트:
   <prompt>
   "사이버 보안에 대해 글을 써주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "소규모 비즈니스 소유자를 위한 사이버 보안 모범 사례에 관한 블로그 게시물을 작성해야 합니다. 이 대상은 기술에 능숙하지 않으므로 콘텐츠는 다음과 같아야 합니다:
   1. 가능한 한 기술적 용어를 피하고 이해하기 쉽게
   2. 빠르게 실행할 수 있는 실용적인 팁 제공
   3. 관심을 유지하기 위해 매력적이고 약간 유머러스하게

   이 비즈니스 소유자들이 채택해야 할 5가지 최고의 사이버 보안 관행을 다루는 1000단어 블로그 게시물의 개요를 제공해 주세요."
   </prompt>

   더 좋은 이유: 좋은 프롬프트는 대상 청중, 원하는 어조, 콘텐츠의 주요 특성을 명시하여 Claude가 적절하고 효과적인 결과물을 만들기 위한 명확한 지침을 제공합니다.

2. **어조와 스타일 정의하기**
   - 원하는 어조를 설명하세요.
   - 스타일 가이드가 있다면 주요 내용을 언급하세요.

   나쁜 프롬프트:
   <prompt>
   "제품 설명서를 작성해주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "새로운 인체공학적 사무용 의자의 제품 설명서 작성을 도와주세요. 전문적이면서도 매력적인 어조를 사용하세요. 우리 브랜드 보이스는 친근하고, 혁신적이며, 건강을 중시합니다. 설명서는 다음을 포함해야 합니다:
   1. 의자의 주요 인체공학적 특징 강조
   2. 이러한 특징이 사용자의 건강과 생산성에 어떤 이점을 주는지 설명
   3. 사용된 지속 가능한 재료에 대한 간략한 언급
   4. 독자가 의자를 시험해 보도록 권장하는 행동 촉구로 마무리

   약 200단어를 목표로 하세요."
   </prompt>

   더 좋은 이유: 이 프롬프트는 어조, 스타일, 제품 설명에 포함할 특정 요소에 대한 명확한 지침을 제공합니다.

3. **결과물 구조 정의하기**
   - 다루고 싶은 요점에 대한 기본 개요나 목록을 제공하세요.

   나쁜 프롬프트:
   <prompt>
   "회사 결과에 대한 프레젠테이션을 만들어주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "2분기 결과에 대한 프레젠테이션을 만들어야 합니다. 다음 섹션으로 구성해주세요:
   1. 개요
   2. 판매 실적
   3. 고객 확보
   4. 도전 과제
   5. 3분기 전망

   각 섹션에 대해, 일반적인 비즈니스 프레젠테이션을 기반으로 3-4개의 핵심 포인트를 제안해주세요. 또한, 각 섹션에 효과적일 데이터 시각화(예: 그래프, 차트) 유형을 하나씩 추천해주세요."
   </prompt>

   더 좋은 이유: 이 프롬프트는 명확한 구조를 제공하고 각 섹션에 대한 특정 요소(핵심 포인트 및 데이터 시각화)를 요청합니다.

### 문서 요약 및 질의응답

1. **원하는 바를 구체적으로 명시하기**
   - 문서의 특정 측면이나 섹션에 대한 요약을 요청하세요.
   - 질문을 명확하고 직접적으로 구성하세요.
   - 원하는 요약 유형(결과물 구조, 콘텐츠 유형)을 명시하세요.

2. **문서 이름 사용하기**
   - 첨부 문서를 이름으로 참조하세요.

3. **인용 요청하기**
   - Claude가 답변에서 문서의 특정 부분을 인용하도록 요청하세요.

다음은 위의 세 가지 기법을 모두 결합한 예시입니다:

   나쁜 프롬프트:
   <prompt>
   "이 보고서를 요약해 주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "50페이지 분량의 'Tech Industry Trends 2023'이라는 시장 조사 보고서를 첨부했습니다. AI와 기계 학습 트렌드에 초점을 맞춘 2개 단락 요약을 제공해 주시겠습니까? 그런 다음, 다음 질문에 답해주세요:
   1. 올해 비즈니스에서 사용되는 AI 애플리케이션 탑 3는 무엇인가요?
   2. 기계 학습이 기술 업계의 직무 역할에 어떤 영향을 미치고 있나요?
   3. 보고서에서 언급하는 AI 도입과 관련된 잠재적 위험이나 과제는 무엇인가요?

   이 질문들에 답할 때 특정 섹션이나 페이지 번호를 인용해 주세요."
   </prompt>

   더 좋은 이유: 이 프롬프트는 요약의 정확한 초점을 지정하고, 특정 질문을 제공하며, 인용을 요청하여 더 타겟팅된 유용한 응답을 보장합니다. 또한 응답을 2단락으로 제한하는 등 이상적인 요약 출력 구조를 나타냅니다.

### 데이터 분석 및 시각화

1. **원하는 형식 지정하기**
   - 원하는 데이터 형식을 명확하게 설명하세요.

   나쁜 프롬프트:
   <prompt>
   "우리 판매 데이터를 분석해 주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "'Sales Data 2023'이라는 스프레드시트를 첨부했습니다. 이 데이터를 분석하고 주요 결과를 다음 형식으로 제시해 주시겠습니까:

   1. 요약 (2-3문장)

   2. 주요 지표:
      - 분기별 총 판매액
      - 최고 성과 제품 카테고리
      - 가장 높은 성장 지역

   3. 동향:
      - 주목할 만한 3가지 동향, 각각 간략한 설명 포함

   4. 권장 사항:
      - 3가지 데이터 기반 권장 사항, 각각 간략한 근거 포함

   분석 후, 이러한 결과를 효과적으로 전달할 수 있는 세 가지 유형의 데이터 시각화를 제안해 주세요."
   </prompt>

   더 좋은 이유: 이 프롬프트는 분석을 위한 명확한 구조를 제공하고, 초점을 맞출 주요 지표를 지정하며, 추가 형식 지정을 위한 권장 사항 및 시각화 제안을 요청합니다.

### 브레인스토밍
 1. Claude에게 가능성이나 대안 목록을 요청하여 아이디어를 생성하세요.
     - Claude가 브레인스토밍에서 다룰 주제를 구체적으로 지정하세요.

   나쁜 프롬프트:
   <prompt>
   "팀 빌딩 아이디어를 알려주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "20명으로 구성된 원격 팀을 위한 팀 빌딩 활동을 생각해 내야 합니다. 다음과 같이 브레인스토밍을 도와주실 수 있나요:
   1. 협업을 촉진하는 10가지 가상 팀 빌딩 활동 제안
   2. 각 활동에 대해, 어떻게 팀워크를 조성하는지 간략히 설명
   3. 다음에 가장 적합한 활동 표시:
      a) 아이스브레이커
      b) 의사소통 개선
      c) 문제 해결 기술
   4. 저비용 옵션 하나와 프리미엄 옵션 하나 제안"
   </prompt>

   더 좋은 이유: 이 프롬프트는 아이디어 수, 활동 유형, 추가 범주화 등 브레인스토밍 세션의 특정 매개변수를 제공하여 더 구조화되고 유용한 결과물을 얻을 수 있습니다.

2. 읽기 쉬운 글머리 기호, 번호 목록 또는 표와 같은 특정 형식으로 응답을 요청하세요.

   나쁜 프롬프트:
   <prompt>
   "프로젝트 관리 소프트웨어 옵션을 비교해 주세요."
   </prompt>

   좋은 프롬프트:
   <prompt>
   "저희는 세 가지 다른 프로젝트 관리 소프트웨어 옵션을 고려하고 있습니다: Asana, Trello, Microsoft Project. 다음 기준을 사용하여 표 형식으로 이들을 비교해 주시겠습니까:
   1. 주요 기능
   2. 사용 용이성
   3. 확장성
   4. 가격 책정 (가능한 경우 특정 플랜 포함)
   5. 통합 기능
   6. 가장 적합한 환경 (예: 소규모 팀, 기업, 특정 산업)"
   </prompt>

   더 좋은 이유: 이 프롬프트는 비교를 위한 특정 구조(표)를 요청하고, 명확한 기준을 제공하여 정보를 이해하고 적용하기 쉽게 만듭니다.
  
## 문제 해결, 환각 최소화, 성능 극대화

1. **Claude가 불확실성을 인정하도록 허용하기**
   - Claude에게 모르는 경우 모른다고 말하도록 지시하세요. 예: "무언가에 대해 확신이 없다면, 모른다고 말해도 괜찮습니다."

2. **복잡한 작업 분해하기**
   - 작업이 너무 크고 Claude가 단계를 놓치거나 특정 단계를 잘 수행하지 못하는 경우, 작은 단계로 나누고 한 번에 한 메시지씩 Claude와 함께 작업하세요.

3. **새 요청에 모든 맥락 정보 포함하기**
   - Claude는 이전 대화의 정보를 유지하지 않으므로, 각 새 대화에 필요한 모든 맥락을 포함하세요.

## 좋은 vs 나쁜 프롬프트 예시

다음은 비효과적인 프롬프트와 매우 효과적인 프롬프트 사이의 뚜렷한 차이를 보여주기 위해 여러 프롬프팅 기법을 결합한 추가 예시입니다.

### 예시 1: 마케팅 전략 개발

나쁜 프롬프트:
<prompt>
"마케팅 전략 만들기를 도와주세요."
</prompt>

좋은 프롬프트:
<prompt>
"선임 마케팅 컨설턴트로서, 환경 의식이 있는 밀레니얼 세대와 Z세대 소비자를 대상으로 하는 새로운 친환경 스마트폰 액세서리 라인을 위한 포괄적인 마케팅 전략 개발에 도움이 필요합니다. 다음을 포함하는 자세한 전략을 제공해 주세요:

1. 시장 분석:
   - 친환경 기술 액세서리의 현재 트렌드
   - 2-3개의 주요 경쟁사와 그들의 전략
   - 잠재적 시장 규모 및 성장 전망

2. 목표 고객 페르소나:
   - 이상적인 고객에 대한 상세한 설명
   - 그들의 문제점과 우리 제품이 이를 어떻게 해결하는지

3. 마케팅 믹스:
   - 제품: 강조할 주요 특징
   - 가격: 제안된 가격 책정 전략과 근거
   - 유통: 권장 유통 채널
   - 프로모션: 
     a) 장단점과 함께 집중할 5개의 마케팅 채널
     b) 출시를 위한 3가지 창의적인 캠페인 아이디어

4. 콘텐츠 전략:
   - 우리 대상에게 공감을 얻을 5가지 콘텐츠 테마
   - 제안된 콘텐츠 유형(예: 블로그 게시물, 동영상, 인포그래픽)

5. KPI 및 측정:
   - 추적할 5가지 주요 지표
   - 이러한 지표를 측정하기 위한 제안 도구

제목과 글머리 기호를 사용하여 이 정보를 구조화된 형식으로 제공해 주세요. 관련성이 있는 경우, 추론을 설명하거나 간략한 예시를 제공해 주세요.

전략 개요를 작성한 후, 우리가 알아야 할 잠재적 도전이나 위험을 식별하고, 각각에 대한 완화 전략을 제안해 주세요."
</prompt>

더 좋은 이유: 이 프롬프트는 역할 할당, 특정 작업 분해, 구조화된 출력 요청, 브레인스토밍(캠페인 아이디어 및 콘텐츠 테마용) 및 설명 요청 등 여러 기법을 결합합니다. 명확한 지침을 제공하면서도 Claude의 분석과 창의성을 위한 여지를 남깁니다.

### 예시 2: 재무 보고서 분석

나쁜 프롬프트:
<prompt>
"이 재무 보고서를 분석해 주세요."
</prompt>

좋은 프롬프트:
<prompt>
"'Q2_2023_Financial_Report.pdf'라는 제목의 회사 2분기 재무 보고서를 첨부했습니다. 경험 많은 CFO로서 이 보고서를 분석하고 이사회를 위한 브리핑을 준비해 주세요. 다음과 같이 분석을 구성해 주세요:

1. 요약 (핵심 요점을 강조하는 3-4문장)

2. 재무 성과 개요:
   a) 수익: 이전 분기 및 작년 동기와 비교
   b) 이익률: 총이익 및 순이익, 중요한 변화에 대한 설명 포함
   c) 현금 흐름: 우려 사항 또는 긍정적인 발전 강조

3. 핵심 성과 지표:
   - 우리의 상위 5개 KPI와 현재 상태 나열 (표 형식 사용)
   - 각 KPI에 대해, 그 중요성과 주목할 만한 트렌드에 대한 간략한 설명 제공

4. 부문별 분석:
   - 우리의 세 가지 주요 비즈니스 부문별 성과 분석
   - 가장 좋은 성과와 가장 나쁜 성과를 보인 부문을 식별하고, 그 성과에 대한 잠재적 이유 제시

5. 대차대조표 검토:
   - 자산, 부채 또는 자본의 중요한 변화 강조
   - 주요 비율 계산 및 해석 (예: 유동 비율, 부채 대 자본 비율)

6. 미래 전망 진술:
   - 이 데이터를 기반으로 3분기에 대한 3가지 주요 예측 제공
   - 재무 상태를 개선하기 위해 고려해야 할 2-3가지 전략적 조치 제안

7. 위험 평가:
   - 이 보고서를 기반으로 3가지 잠재적 재무 위험 식별
   - 각 위험에 대한 완화 전략 제안

8. 경쟁사 비교:
   - 2-3개의 주요 경쟁사와 우리의 성과 비교 (공개적으로 이용 가능한 데이터 사용)
   - 우리가 우수한 영역과 개선이 필요한 영역 강조

데이터를 시각화하기 위해 적절한 경우 차트나 표를 사용해 주세요. 가정이나 해석을 하는 경우, 명확하게 진술하고 근거를 제공해 주세요.

분석을 완료한 후, 이사회 멤버들이 이 보고서에 대해 물을 수 있는 5가지 잠재적 질문과 함께 제안된 응답을 생성해 주세요.

마지막으로, 이사회 회의에서 시작 발언으로 사용할 수 있는, 전체 분석을 한 단락으로 요약해 주세요."
</prompt>

더 좋은 이유: 이 프롬프트는 역할 연기(CFO로서), 구조화된 출력, 특정 데이터 분석 요청, 예측 분석, 위험 평가, 비교 분석, 그리고 후속 질문까지 예상합니다. 명확한 프레임워크를 제공하면서도 깊은 분석과 전략적 사고를 장려합니다.