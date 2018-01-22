package de.maibornwolff.codecharta.importer.scmlogparser.parser.git;

import de.maibornwolff.codecharta.importer.scmlogparser.parser.LogLineCollector;
import de.maibornwolff.codecharta.importer.scmlogparser.parser.LogParserStrategy;
import de.maibornwolff.codecharta.model.input.Modification;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class GitLogNumstatParserStrategy implements LogParserStrategy {

    public static final String CORRESPONDING_LOG_CREATION_CMD = "git log --numstat --no-renames";
    private static final Predicate<String> GIT_COMMIT_SEPARATOR_TEST = logLine -> logLine.startsWith("commit");
    private static final String AUTHOR_ROW_INDICATOR = "Author: ";
    public static final char AUTHOR_ROW_BEGIN_OF_EMAIL = '<';
    private static final String DATE_ROW_INDICATOR = "Date: ";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("EEE MMM d HH:mm:ss yyyy ZZZ", Locale.US);
    public static final String FILE_LINE_SPLITTER = "\\s+";
    private static final String FILE_LINE_REGEX = "\\d+\\s+\\d+\\s+\\S+";

    @Override
    public List<String> listSupportedMetrics() {
        return Arrays.asList(
                "code_churn",
                "number_of_authors",
                "number_of_commits",
                "weeks_with_commits"
        );
    }

    private boolean isFileLine(String commitLine) {
        if (commitLine.length() < 5) {
            return false;
        }
        return commitLine.matches(FILE_LINE_REGEX);
    }

    Modification parseModification(String fileLine) {
        String[] lineParts = fileLine.split(FILE_LINE_SPLITTER);
        int additions = Integer.parseInt(lineParts[0]);
        int deletions = Integer.parseInt(lineParts[1]);
        String filename = lineParts[2];
        return new Modification(filename.trim(), additions, deletions);
    }

    public Collector<String, ?, Stream<List<String>>> createLogLineCollector() {
        return LogLineCollector.create(GIT_COMMIT_SEPARATOR_TEST);
    }

    @Override
    public Optional<String> parseAuthor(List<String> commitLines) {
        return commitLines.stream()
                .filter(commitLine -> commitLine.startsWith(AUTHOR_ROW_INDICATOR))
                .map(this::parseAuthor)
                .findFirst();

    }

    String parseAuthor(String authorLine) {
        String authorWithEmail = authorLine.substring(AUTHOR_ROW_INDICATOR.length());
        int beginOfEmail = authorWithEmail.indexOf(AUTHOR_ROW_BEGIN_OF_EMAIL);
        if (beginOfEmail < 0) {
            return authorWithEmail;
        }
        return authorWithEmail.substring(0, beginOfEmail).trim();
    }

    @Override
    public List<Modification> parseModifications(List<String> commitLines) {
        return commitLines.stream()
                .filter(this::isFileLine)
                .map(this::parseModification)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<LocalDateTime> parseDate(List<String> commitLines) {
        return commitLines.stream()
                .filter(commitLine -> commitLine.startsWith(DATE_ROW_INDICATOR))
                .map(this::parseCommitDate)
                .findFirst();
    }

    private LocalDateTime parseCommitDate(String metadataDateLine) {
        String commitDateAsString = metadataDateLine.replace(DATE_ROW_INDICATOR, "").trim();
        return LocalDateTime.parse(commitDateAsString, DATE_TIME_FORMATTER);
    }
}