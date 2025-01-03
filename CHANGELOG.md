# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2025-01-04

### Changed
- Refactored monthly list components to use configuration-driven generic component
- Removed redundant individual list components
- Improved code maintainability and reduced duplication

## [0.3.0] - 2025-01-04

### Added
- Monthly Review feature
  - Work accomplishments tracking
  - Project updates section
  - Learning and growth section
  - Health and wellness tracking
  - Life events documentation
  - Learnings to remember
  - Future hopes and aspirations
- Month-to-month navigation
  - Previous/next month navigation
  - Current month shortcut
- Import/export functionality for monthly reviews

### Changed
- Refactored storage management with factory pattern
- Improved component organization with shared UI components
- Added configuration-driven section management
- Enhanced data validation for array fields

### Fixed
- Array initialization issues in monthly storage
- Header controls conditional rendering

## [0.2.0] - 2025-01-02

### Added
- Week navigation feature
  - Ability to navigate to previous weeks
  - Week range display with month and year
  - "Back to Current Week" shortcut
- Empty entry submission support
  - Ability to remove entries by submitting empty fields
  - Improved validation logic

### Changed
- Updated date display format in entry section
- Improved TypeScript types for state management
- Enhanced entry display component

## [0.1.0] - 2024-12-25

### Added
- Initial release
- Basic journal entry functionality
- Weekly overview
- Local storage implementation
- Dark/light theme support