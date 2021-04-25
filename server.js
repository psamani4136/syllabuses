const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

//variables from config
const config = require("config");
const connectDB = require("./config/db");
const PORT = config.get("PORT");
const nodeEnv = config.get("NODE_ENV");
const clientUrl = config.get("CLIENT_URL");

//routes import

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const introductionRoutes = require("./routes/introduction");
const structureRoutes = require("./routes/structure");
const forewordRoutes = require("./routes/foreword");
const assessmentRoutes = require("./routes/assessment");
const referencesRoutes = require("./routes/reference");
const acknowledgementRoutes = require("./routes/acknowledgement");
const aimRoutes = require("./routes/aim");
const rationaleRoutes = require("./routes/rationale");
const substrandRoutes = require("./routes/substrand");
const strandRoutes = require("./routes/strand");
const glossaryRoutes = require("./routes/glossary");
const resourceRoutes = require("./routes/resource");
const contributionRoutes = require("./routes/contribution");
const subjectRoutes = require("./routes/subject");
const sectionRoutes = require("./routes/section");
const outcomeRoutes = require("./routes/outcome");
const syllabusRoutes = require("./routes/syllabus");
const yearRoutes = require("./routes/year");
const supplementaryRoutes = require("./routes/supplementary");
const generalRoutes = require("./routes/general");
const generalPscRoutes = require("./routes/generalPsc");
const specificPscRoutes = require("./routes/specificPsc");
const socialRoutes = require("./routes/social_tools");
const scienceRoutes = require("./routes/science_tools");
const lprimaryRoutes = require("./routes/lower_primary");
const uprimaryRoutes = require("./routes/upper_primary");
const profileRoutes = require("./routes/profile");
const processesPscRoutes = require("./routes/processes_Psc");
const processesPssRoutes = require("./routes/processes_Pss");
const approachesRoutes = require("./routes/approaches");
const skillsPscRoutes = require("./routes/skills_psc");
const skillsPssRoutes = require("./routes/skills_pss");
const headPscRoutes = require("./routes/head_psc");
const headPssRoutes = require("./routes/head_pss");
const noteRoutes = require("./routes/note");
const termRoutes = require("./routes/term");
const bookRoutes = require("./routes/book");
const linkAreasRoutes = require("./routes/link_areas");
const linksRoutes = require("./routes/links");
const issueRoutes = require("./routes/issue");
const learningRoutes = require("./routes/learning_primary");
const monitorHeadingsRoutes = require("./routes/monitor_headings");
const monitorRoutes = require("./routes/monitor");
const substrandTitleRoutes = require("./routes/substrandTitle");
const localBookRoutes = require("./routes/localBook");

// beyond the word;
const beyondRoutes = require("./routes/beyond_the_word/beyond_the_word_section");
const beyondTitleRoutes = require("./routes/beyond_the_word/beyond_the_word_title");
const beyondTextRoutes = require("./routes/beyond_the_word/beyond_the_word_text");

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb", extended: true }));       
// app.use(express.json());
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//db connection
connectDB();

//cors
if (nodeEnv === "development") {
  app.use(cors({ origin: `${clientUrl}` }));
}

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", forewordRoutes);
app.use("/api", assessmentRoutes);
app.use("/api", referencesRoutes);
app.use("/api", acknowledgementRoutes);
app.use("/api", introductionRoutes);
app.use("/api", aimRoutes);
app.use("/api", structureRoutes);
app.use("/api", rationaleRoutes);
app.use("/api", substrandRoutes);
app.use("/api", strandRoutes);
app.use("/api", resourceRoutes);
app.use("/api", subjectRoutes);
app.use("/api", sectionRoutes);
app.use("/api", glossaryRoutes);
app.use("/api", contributionRoutes);
app.use("/api", outcomeRoutes);
app.use("/api", syllabusRoutes);
app.use("/api", yearRoutes);
app.use("/api", noteRoutes);
app.use("/api", termRoutes);
app.use("/api", bookRoutes);
app.use("/api", supplementaryRoutes);
app.use("/api", generalRoutes);
app.use("/api", generalPscRoutes);
app.use("/api", specificPscRoutes);
app.use("/api", socialRoutes);
app.use("/api", scienceRoutes);
app.use("/api", profileRoutes);
app.use("/api", processesPscRoutes);
app.use("/api", processesPssRoutes);
app.use("/api", skillsPscRoutes);
app.use("/api", skillsPssRoutes);
app.use("/api", headPscRoutes);
app.use("/api", headPssRoutes);
app.use("/api", lprimaryRoutes);
app.use("/api", uprimaryRoutes);
app.use("/api", approachesRoutes);
app.use("/api", linkAreasRoutes);
app.use("/api", linksRoutes);
app.use("/api", issueRoutes);
app.use("/api", monitorHeadingsRoutes);
app.use("/api", monitorRoutes);
app.use("/api", learningRoutes);
app.use("/api", localBookRoutes);
app.use("/api", substrandTitleRoutes);

// beyond the word;
app.use("/api", beyondRoutes);
app.use("/api", beyondTitleRoutes);
app.use("/api", beyondTextRoutes);

//port
const port = `${PORT}`;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
